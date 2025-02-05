package main

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/v1/terminology/search", app.searchHandler)
	router.HandlerFunc(http.MethodGet, "/v1/terminology/lookup/:system/:code", app.lookupHandler)
	router.HandlerFunc(http.MethodGet, "/v1/terminology/systems", app.listSystemsHandler)

	return app.enableCORS(app.rateLimit(router))
}
