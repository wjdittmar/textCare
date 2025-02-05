package main

import (
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func (app *application) searchHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()

	system := query.Get("system")
	searchQuery := query.Get("q")
	limit, _ := strconv.Atoi(query.Get("limit"))

	if limit <= 0 || limit > 100 {
		limit = 10
	}

	codes, err := app.models.Search(r.Context(), system, searchQuery, limit)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"results": codes}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) lookupHandler(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())
	system := params.ByName("system")
	code := params.ByName("code")

	result, err := app.models.GetByCode(r.Context(), system, code)
	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"code": result}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
