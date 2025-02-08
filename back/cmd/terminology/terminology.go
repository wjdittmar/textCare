package main

import (
	"net/http"
	"strconv"
)

func (app *application) searchICD10Handler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit <= 0 || limit > 100 {
		limit = 10
	}

	codes, err := app.models.ICD10.Search(query, limit)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	web.WriteJSON(w, http.StatusOK, web.Envelope{"icd10": codes}, nil)
}
