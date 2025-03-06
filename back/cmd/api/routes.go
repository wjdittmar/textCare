package main

import (
	"github.com/julienschmidt/httprouter"
	"github.com/wjdittmar/textCare/back/internal/middleware"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()
	router.NotFound = http.HandlerFunc(app.errorHandler.NotFoundResponse)
	router.MethodNotAllowed = http.HandlerFunc(app.errorHandler.MethodNotAllowedResponse)

	router.HandlerFunc(http.MethodGet, "/v1/healthcheck", app.healthcheckHandler)

	router.HandlerFunc(http.MethodGet, "/v1/providers", app.listProvidersHandler)
	router.HandlerFunc(http.MethodGet, "/v1/providers/:id", app.requirePermission("providers:read", app.getProviderHandler))
	router.HandlerFunc(http.MethodPost, "/v1/providers", app.requirePermission("providers:write", app.createProviderHandler))

	router.HandlerFunc(http.MethodPost, "/v1/users", app.registerUserHandler)
	router.HandlerFunc(http.MethodGet, "/v1/users/exists", app.checkUserExistsHandler)
	router.HandlerFunc(http.MethodPost, "/v1/users/me/completeProfileAndOnboarding", app.completeProfileAndOnboarding)
	router.HandlerFunc(http.MethodGet, "/v1/users/me", app.getCurrentUser)
	router.HandlerFunc(http.MethodPost, "/v1/tokens/authentication", app.createAuthenticationTokenHandler)
	router.HandlerFunc(http.MethodPost, "/v1/tokens/refresh", app.refreshAuthenticationTokenHandler)
	router.HandlerFunc(http.MethodGet, "/v1/cmt/search", app.getCMTHandler)
	router.HandlerFunc(http.MethodGet, "/v1/medications/search", app.getMedicationsHandler)

	rl := middleware.NewRateLimiter(
		app.config.Limiter.RPS,
		app.config.Limiter.Burst,
		app.config.Limiter.Enabled,
	)
	return middleware.RecoverPanic(app.logger)(
		middleware.CORS(app.config.CORSAllowedOrigins)(
			rl.Limit(
				app.authenticate(router),
			),
		),
	)
}
