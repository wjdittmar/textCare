#!/usr/bin/env python3

import csv
import psycopg2
import argparse

parser = argparse.ArgumentParser(description='Process top 300 medications and add to RxNorm autocomplete database.')
parser.add_argument('--host', required=True, help='Database host address')
parser.add_argument('--dbname', required=True, help='Database name')
parser.add_argument('--user', required=True, help='Database username')
parser.add_argument('--password', required=True, help='Database password')
parser.add_argument('--csv', required=True, help='Path to the CSV file containing medications')
parser.add_argument('--col', default='medication_name', help='CSV column name for medication (default: medication_name)')

# Parse arguments
args = parser.parse_args()


try:


    conn = psycopg2.connect(
            host=args.host,
            dbname=args.dbname,
            user=args.user,
            password=args.password
        )

    cur = conn.cursor()

    cur.execute("""
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_top_medications (
        medication_name VARCHAR(255)
    )
    """)

    cur.execute("TRUNCATE TABLE temp_top_medications")

    cur.execute("""
    CREATE TABLE IF NOT EXISTS medication_autocomplete (
        id SERIAL PRIMARY KEY,
        rxcui VARCHAR(8) UNIQUE,
        medication_name VARCHAR(255),
        preferred_term VARCHAR(3000),
        tty VARCHAR(20),
        source VARCHAR(20),
        code VARCHAR(50)
    )
    """)

    cur.execute("SELECT clear_temp_medications()")

    # List taken from https://meps.ahrq.gov/mepsweb/data_stats/download_data_files_detail.jsp?cboPufNumber=HC-239A
    # Removed medication classes from list, sorted by frequency, and took top 300
    # Read CSV and load medications
    with open('/Users/wjdittmar/Downloads/top300_medications.csv', 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            if row:
                medication = row[0].strip()
                cur.execute("INSERT INTO temp_top_medications (medication_name) VALUES (%s)", (medication,))
                print(f"Added {medication}")

        cur.execute("""
        WITH exact_matches AS (
            SELECT DISTINCT
                rx.RXCUI,
                temp.medication_name,
                rx.STR AS preferred_term,
                rx.TTY,
                rx.SAB AS source,
                rx.CODE
            FROM
                temp_top_medications temp
            JOIN
                RXNCONSO rx ON LOWER(rx.STR) = LOWER(temp.medication_name)
            WHERE
                rx.TTY IN ('SCD', 'SBD', 'GPCK', 'BPCK', 'IN', 'PIN', 'MIN', 'BN', 'DF')
                AND rx.SAB = 'RXNORM'
                AND (rx.SUPPRESS IS NULL OR rx.SUPPRESS <> 'O')
        )
        SELECT * FROM exact_matches
        """)

        exact_matches = cur.fetchall()
        print(f"\nFound {len(exact_matches)} exact matches")

        cur.execute("""
        WITH exact_matches AS (
            SELECT DISTINCT
                rx.RXCUI,
                temp.medication_name
            FROM
                temp_top_medications temp
            JOIN
                RXNCONSO rx ON LOWER(rx.STR) = LOWER(temp.medication_name)
            WHERE
                rx.TTY IN ('SCD', 'SBD', 'GPCK', 'BPCK', 'IN', 'PIN', 'MIN', 'BN', 'DF')
                AND rx.SAB = 'RXNORM'
                AND (rx.SUPPRESS IS NULL OR rx.SUPPRESS <> 'O')
        ),
        fuzzy_matches AS (
            SELECT DISTINCT ON (t.medication_name)
                rx.RXCUI,
                t.medication_name,
                rx.STR AS preferred_term,
                rx.TTY,
                rx.SAB AS source,
                rx.CODE
            FROM
                temp_top_medications t
            LEFT JOIN
                exact_matches e ON t.medication_name = e.medication_name
            JOIN
                RXNCONSO rx ON rx.STR ILIKE '%' || t.medication_name || '%'
            WHERE
                e.medication_name IS NULL -- Only process medications without exact matches
                AND rx.TTY IN ('SCD', 'SBD', 'GPCK', 'BPCK', 'IN', 'PIN', 'MIN', 'BN', 'DF')
                AND rx.SAB = 'RXNORM'
                AND (rx.SUPPRESS IS NULL OR rx.SUPPRESS <> 'O')
            ORDER BY
                t.medication_name,
                CASE
                    WHEN LOWER(rx.STR) = LOWER(t.medication_name) THEN 0
                    WHEN rx.STR ILIKE t.medication_name || '%' THEN 1
                    WHEN rx.STR ILIKE '%' || t.medication_name THEN 2
                    ELSE 3
                END
        )
        SELECT * FROM fuzzy_matches
        """)

        fuzzy_matches = cur.fetchall()
        print(f"\nFound {len(fuzzy_matches)} fuzzy matches")


        total_matches = len(exact_matches) + len(fuzzy_matches)
        print(f"\nTotal: {total_matches} medications matched")

        confirmation = input("\nDo you want to save these medications to the autocomplete table? (y/n): ")

        if confirmation.lower() == 'y':

            cur.execute("TRUNCATE TABLE medication_autocomplete")


            for match in exact_matches:
                cur.execute("""
                INSERT INTO medication_autocomplete
                (rxcui, medication_name, preferred_term, tty, source, code)
                VALUES (%s, %s, %s, %s, %s, %s)
                """, match)

            for match in fuzzy_matches:
                cur.execute("""
                INSERT INTO medication_autocomplete
                (rxcui, medication_name, preferred_term, tty, source, code)
                VALUES (%s, %s, %s, %s, %s, %s)
                """, match)


            cur.execute("""
            CREATE INDEX IF NOT EXISTS idx_medication_autocomplete_name
                ON medication_autocomplete (medication_name);
            CREATE INDEX IF NOT EXISTS idx_medication_autocomplete_preferred
                ON medication_autocomplete (preferred_term);
            """)

            print("Changes committed successfully!")
        else:
            print("Changes discarded.")


except Exception as e:
    print(f"Error: {e}")
    conn.rollback()
finally:
    conn.commit()
    cur.close()
    conn.close()
