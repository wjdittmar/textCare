package main

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
	"os"
	"path/filepath"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()
	router.NotFound = http.HandlerFunc(app.notFoundResponse)
	router.MethodNotAllowed = http.HandlerFunc(app.methodNotAllowedResponse)

	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthcheckHandler)

	router.HandlerFunc(http.MethodGet, "/v1/providers", app.listProvidersHandler)
	router.HandlerFunc(http.MethodGet, "/v1/providers/:id", app.requirePermission("providers:read", app.getProviderHandler))
	router.HandlerFunc(http.MethodPost, "/v1/providers", app.requirePermission("providers:write", app.createProviderHandler))

	router.HandlerFunc(http.MethodPost, "/v1/users", app.registerUserHandler)
	router.HandlerFunc(http.MethodGet, "/v1/users/exists", app.checkUserExistsHandler)
	router.HandlerFunc(http.MethodPatch, "/v1/users/me/pcp", app.updateProviderForUser)
	router.HandlerFunc(http.MethodPost, "/v1/tokens/authentication", app.createAuthenticationTokenHandler)
	router.HandlerFunc(http.MethodPost, "/v1/tokens/refresh", app.refreshAuthenticationTokenHandler)
	router.HandlerFunc(http.MethodGet, "/v1/icd10", app.getIcd10Handler)

	// serve the nextjs frontend
	router.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		outDir := "../front/textcare/out"
		requestedPath := filepath.Join(outDir, r.URL.Path)

		info, err := os.Stat(requestedPath)
		if err == nil && !info.IsDir() {
			http.ServeFile(w, r, requestedPath)
			return
		}
		// serve index.html if the route is a directory
		http.ServeFile(w, r, filepath.Join(requestedPath, "index.html"))
	})
	return app.recoverPanic(app.enableCORS(app.rateLimit(app.authenticate(router))))
}
