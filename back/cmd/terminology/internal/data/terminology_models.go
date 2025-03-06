package data

import "database/sql"

type CMT struct {
	SCTID                 string `json:"sctid"`
	ClinicianFriendlyName string `json:"clinician_friendly_name"`
	PatientFriendlyName   string `json:"patient_friendly_name"`
	ICD10CM               string `json:"icd_10_cm"`
	FullySpecifiedName    string `json:"fully_specified_name"`
	Module                string `json:"module"`
}

type Medication struct {
	ID             int    `json:"id"`
	RXCUI          string `json:"rxcui"`
	MedicationName string `json:"medication_name"`
	PreferredTerm  string `json:"preferred_term"`
	TTY            string `json:"tty"`
	Source         string `json:"source"`
	Code           string `json:"code"`
}

type CMTModel struct {
	DB *sql.DB
}
type MedicationsModel struct {
	DB *sql.DB
}

type TerminologyModels struct {
	CMT         CMTModel
	Medications MedicationsModel
}

func NewTerminologyModels(db *sql.DB) TerminologyModels {
	return TerminologyModels{
		CMT:         CMTModel{DB: db},
		Medications: MedicationsModel{DB: db},
	}
}
