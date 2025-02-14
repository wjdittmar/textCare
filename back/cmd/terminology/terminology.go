package main

import (
	"github.com/wjdittmar/textCare/back/internal/web"
	"net/http"
	"strconv"
)

func (app *application) searchPatientFriendlyNameHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit <= 0 || limit > 100 {
		limit = 10
	}

	codes, err := app.models.CMT.SearchPatientFriendlyNames(query, limit)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	web.WriteJSON(w, http.StatusOK, web.Envelope{"cmtCodes": codes}, nil)
}
