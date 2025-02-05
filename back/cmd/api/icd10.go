package main

import (
	"github.com/wjdittmar/textCare/cmd/api/client"
	"net/http"
)

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

	terminologyClient := client.NewTerminologyClient(app.config.TerminologyServiceURL)

	codes, err := terminologyClient.Search(r.Context(), "ICD10", input.QueryString, input.Limit)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"icd10codes": codes}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
