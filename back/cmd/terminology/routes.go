package main

import (
	"github.com/julienschmidt/httprouter"
	//"github.com/wjdittmar/textCare/back/internal/middleware"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/v1/terminology/icd10", app.searchICD10Handler)
	//router.HandlerFunc(http.MethodGet, "/v1/terminology/loinc", app.searchLOINCHandler)
	return router
	//return middleware.RecoverPanic(middleware.RateLimiter(middleware.CORS(router)))
}
