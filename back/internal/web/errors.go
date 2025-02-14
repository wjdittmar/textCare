package web

import (
	"fmt"
	"github.com/wjdittmar/textCare/back/internal/jsonlog"
	"net/http"
)

type ErrorHandler struct {
	Logger *jsonlog.Logger
}

func (e *ErrorHandler) LogError(r *http.Request, err error) {
	e.Logger.PrintError(err, map[string]string{
		"request_method": r.Method,
		"request_url":    r.URL.String()})
}

func (e *ErrorHandler) ErrorResponse(w http.ResponseWriter, r *http.Request, status int, message interface{}) {
	env := Envelope{"error": message}

	err := WriteJSON(w, status, env, nil)
	if err != nil {
		e.LogError(r, err)
	}
}

func (e *ErrorHandler) InvalidAuthenticationTokenResponse(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("WWW-Authenticate", "Bearer")
	message := "invalid or missing authentication token"
	e.ErrorResponse(w, r, http.StatusUnauthorized, message)
}

func (e *ErrorHandler) InvalidCredentialsResponse(w http.ResponseWriter, r *http.Request) {
	message := "invalid authentication credentials"
	e.ErrorResponse(w, r, http.StatusUnauthorized, message)

}

func (e *ErrorHandler) ServerErrorResponse(w http.ResponseWriter, r *http.Request, err error) {
	e.LogError(r, err)
	message := "the server encountered a problem and could not process your request"
	e.ErrorResponse(w, r, http.StatusInternalServerError, message)
}

func (e *ErrorHandler) NotFoundResponse(w http.ResponseWriter, r *http.Request) {
	message := "the requested resource could not be found"
	e.ErrorResponse(w, r, http.StatusNotFound, message)
}

func (e *ErrorHandler) MethodNotAllowedResponse(w http.ResponseWriter, r *http.Request) {
	message := fmt.Sprintf("the %s method is not supported for this resource", r.Method)
	e.ErrorResponse(w, r, http.StatusMethodNotAllowed, message)
}

func (e *ErrorHandler) BadRequestResponse(w http.ResponseWriter, r *http.Request, err error) {
	e.ErrorResponse(w, r, http.StatusBadRequest, err.Error())
}

func (e *ErrorHandler) FailedValidationResponse(w http.ResponseWriter, r *http.Request, errors map[string]string) {
	e.ErrorResponse(w, r, http.StatusUnprocessableEntity, errors)
}

func (e *ErrorHandler) EditConflictResponse(w http.ResponseWriter, r *http.Request) {
	message := "unable to update the record due to an edit conflict, please try again"
	e.ErrorResponse(w, r, http.StatusConflict, message)
}

func (e *ErrorHandler) RateLimitExceededResponse(w http.ResponseWriter, r *http.Request) {
	message := "rate limit exceeded"
	e.ErrorResponse(w, r, http.StatusTooManyRequests, message)
}

func (e *ErrorHandler) AuthenticationRequiredResponse(w http.ResponseWriter, r *http.Request) {
	message := "you must be authenticated to access this resource"
	e.ErrorResponse(w, r, http.StatusUnauthorized, message)
}

func (e *ErrorHandler) NotPermittedResponse(w http.ResponseWriter, r *http.Request) {
	message := "your user account doesn't have the necessary permissions to access this resource"
	e.ErrorResponse(w, r, http.StatusForbidden, message)
}
