package data

import (
	"context"
	"fmt"
	"strings"
)

func (m CMTModel) SearchPatientFriendlyNames(query string, limit int) ([]*CMT, error) {
	query = strings.TrimSpace(query)
	if query == "" {
		return nil, fmt.Errorf("empty search query")
	}

	// just get the first one and we will handle the one:many when mapping back to SNOMED
	stmt := `SELECT DISTINCT ON (patient_friendly_name) sctid, clinician_friendly_name, patient_friendly_name,
       icd_10_cm, fully_specified_name, module
FROM cmt_terminology
WHERE is_current = TRUE
  AND patient_friendly_name ILIKE '%' || $1 || '%'
ORDER BY patient_friendly_name, sctid
LIMIT $2;`

	rows, err := m.DB.QueryContext(context.Background(), stmt, query, limit)
	if err != nil {
		return nil, fmt.Errorf("failed to query patient names: %w", err)
	}
	defer rows.Close()

	var results []*CMT
	for rows.Next() {
		var cmt CMT
		err := rows.Scan(
			&cmt.SCTID,
			&cmt.ClinicianFriendlyName,
			&cmt.PatientFriendlyName,
			&cmt.ICD10CM,
			&cmt.FullySpecifiedName,
			&cmt.Module,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan cmt record: %w", err)
		}
		results = append(results, &cmt)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("rows iteration error: %w", err)
	}

	return results, nil
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
