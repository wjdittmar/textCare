package main

import (
	"net/http"

	"github.com/wjdittmar/textCare/back/internal/httpclient"
	"github.com/wjdittmar/textCare/back/internal/web"
)

func (app *application) getCMTHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("qs")
	limit := web.ReadInt(r.URL.Query(), "limit", 10, nil)

	client := httpclient.New(app.config.TerminologyServiceURL)
	resp, err := client.SearchCMT(r.Context(), query, limit)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	web.WriteJSON(w, http.StatusOK, web.Envelope{"cmtCodes": resp}, nil)
}
