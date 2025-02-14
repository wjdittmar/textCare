package data

import (
	"database/sql"
	"encoding/csv"
	"flag"
	"fmt"
	_ "github.com/lib/pq"
	"golang.org/x/text/encoding/charmap"
	"golang.org/x/text/transform"
	"log"
	"os"
	"strings"
	"time"

	"bytes"
)

func main() {
	var userName string
	var pass string

	flag.StringVar(&userName, "username", "user", "postgres username")
	flag.StringVar(&pass, "password", "pass", "postgres password")

	flag.Parse()

	connStr := fmt.Sprintf("postgresql://%v:%v@dpg-cu58on3v2p9s73bqehkg-a.oregon-postgres.render.com/textcare", userName, pass)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	fileBytes, err := os.ReadFile("./kp_cmt.tsv")
	if err != nil {
		log.Fatal(err)
	}

	decoder := charmap.ISO8859_1.NewDecoder()
	utf8Reader := transform.NewReader(bytes.NewReader(fileBytes), decoder)

	r := csv.NewReader(utf8Reader)
	r.Comma = '\t'
	records, err := r.ReadAll()

	tx, err := db.Begin()

	stmt, err := tx.Prepare(`
		INSERT INTO cmt_terminology(sctid, clinician_friendly_name, patient_friendly_name, icd_10_cm, fully_specified_name, module, created_at, updated_at, is_current)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`)
	for _, record := range records[1:] { // Skip header

		_, err := stmt.Exec(
			record[3],
			record[0],
			record[1],
			strings.Split(record[2], "/")[0], // only get first ICD10 code when multiple are specified
			record[4],
			record[5],
			time.Now(),
			time.Now(),
			true,
		)
		if err != nil {
			log.Fatalf("Error inserting %s: %v", record[3], err)
		}
	}

	tx.Commit()
}
