package main

import (
	"github.com/julienschmidt/httprouter"
	"github.com/wjdittmar/textCare/back/internal/middleware"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/v1/terminology/cmt/search", app.searchPatientFriendlyNameHandler)
	router.HandlerFunc(http.MethodGet, "/v1/terminology/medications/search", app.searchMedicationHandler)

	rl := middleware.NewRateLimiter(
		app.config.Limiter.RPS,
		app.config.Limiter.Burst,
		app.config.Limiter.Enabled,
	)
	return middleware.RecoverPanic(app.logger)(
		middleware.CORS(app.config.CORSAllowedOrigins)(
			rl.Limit(router)),
	)
}
