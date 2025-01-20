package main

import (
	"net/http"
)

func (app *application) getIcd10Handler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		QueryString string
	}

	qs := r.URL.Query()

	input.QueryString = app.readString(qs, "qs", "")

	codes := app.models.ICD10.SearchByDescription(input.QueryString, 10)

	err := app.writeJSON(w, http.StatusOK, envelope{"icd10codes": codes}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}

}
