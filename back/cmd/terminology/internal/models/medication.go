package models

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
)

type Medication struct {
	ID             int    `json:"id"`
	RXCUI          string `json:"rxcui"`
	MedicationName string `json:"medication_name"`
	PreferredTerm  string `json:"preferred_term"`
	TTY            string `json:"tty"`
	Source         string `json:"source"`
	Code           string `json:"code"`
}

type MedicationsModel struct {
	DB *sql.DB
}

func (m MedicationsModel) SearchMedications(query string, limit int) ([]*Medication, error) {
	query = strings.TrimSpace(query)
	if query == "" {
		return nil, fmt.Errorf("empty search query")
	}

	stmt := `SELECT id, rxcui, medication_name, preferred_term, tty, source, code
FROM medication_autocomplete
WHERE medication_name ILIKE '%' || $1 || '%'
LIMIT $2;`

	rows, err := m.DB.QueryContext(context.Background(), stmt, query, limit)
	if err != nil {
		return nil, fmt.Errorf("failed to query medications names: %w", err)
	}
	defer rows.Close()

	var results []*Medication
	for rows.Next() {
		var medication Medication
		err := rows.Scan(
			&medication.ID,
			&medication.RXCUI,
			&medication.MedicationName,
			&medication.PreferredTerm,
			&medication.TTY,
			&medication.Source,
			&medication.Code,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan medication record: %w", err)
		}
		results = append(results, &medication)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("rows iteration error: %w", err)
	}

	return results, nil
}
