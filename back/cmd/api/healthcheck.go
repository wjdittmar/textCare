package main

import (
	"github.com/wjdittmar/textCare/back/internal/web"
	"net/http"
)

func (app *application) healthcheckHandler(w http.ResponseWriter, r *http.Request) {

	env := web.Envelope{
		"status": "available",
		"system_info": map[string]string{
			"environment": app.config.Env,
			"version":     version,
		},
	}
	err := web.WriteJSON(w, http.StatusOK, env, nil)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
	}
}
