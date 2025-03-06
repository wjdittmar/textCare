package models

import (
	"database/sql"
)

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
