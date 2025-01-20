package main

import (
	"github.com/wjdittmar/textCare/back/internal/validator"
	"net/http"
)

const maxQueryResults = 10

func (app *application) getIcd10Handler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		QueryString string
		Limit       int
	}
	v := validator.New()
	qs := r.URL.Query()

	input.QueryString = app.readString(qs, "qs", "")
	input.Limit = app.readInt(qs, "limit", 10, v)

	if !v.Valid() || input.Limit < 1 {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	if input.Limit > maxQueryResults {
		input.Limit = 10
	}

	codes := app.models.ICD10.SearchByDescription(input.QueryString, input.Limit)

	err := app.writeJSON(w, http.StatusOK, envelope{"icd10codes": codes}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

}
