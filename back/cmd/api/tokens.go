package main

import (
	"errors"
	"github.com/wjdittmar/textCare/back/internal/data"
	"github.com/wjdittmar/textCare/back/internal/validator"
	"github.com/wjdittmar/textCare/back/internal/web"
	"net/http"
	"time"
)

func (app *application) createAuthenticationTokenHandler(w http.ResponseWriter, r *http.Request) {

	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	err := web.ReadJSON(w, r, &input)
	if err != nil {
		app.errorHandler.BadRequestResponse(w, r, err)
		return
	}
	v := validator.New()
	data.ValidateEmail(v, input.Email)
	data.ValidatePasswordPlaintext(v, input.Password)
	if !v.Valid() {
		app.errorHandler.FailedValidationResponse(w, r, v.Errors)
		return
	}

	user, err := app.models.Users.GetByEmail(input.Email)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.errorHandler.InvalidCredentialsResponse(w, r)
		default:
			app.errorHandler.ServerErrorResponse(w, r, err)
		}
		return
	}

	match, err := user.Password.Matches(input.Password)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	if !match {
		app.errorHandler.InvalidCredentialsResponse(w, r)
		return
	}

	accessToken, err := app.models.Tokens.New(user.ID, 15*time.Minute, data.ScopeAuthentication)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	refreshToken, err := app.models.Tokens.New(user.ID, 24*time.Hour*7, data.ScopeRefresh)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    refreshToken.Plaintext,
		Path:     "/",
		MaxAge:   604800, // 7 days
		HttpOnly: true,
		Secure:   app.config.Env == "production",
		SameSite: http.SameSiteStrictMode,
	})

	err = web.WriteJSON(w, http.StatusCreated, web.Envelope{"access_token": accessToken.Plaintext}, nil)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
	}
}

func (app *application) refreshAuthenticationTokenHandler(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		app.errorHandler.AuthenticationRequiredResponse(w, r)
		return
	}

	token, err := app.models.Tokens.GetForToken(cookie.Value)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.errorHandler.AuthenticationRequiredResponse(w, r)
		default:
			app.errorHandler.ServerErrorResponse(w, r, err)
		}
		return
	}

	err = app.models.Tokens.DeleteAllForUser(data.ScopeRefresh, token.UserID)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	newAccessToken, err := app.models.Tokens.New(token.UserID, 15*time.Minute, data.ScopeAuthentication)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	newRefreshToken, err := app.models.Tokens.New(token.UserID, 24*time.Hour*7, data.ScopeRefresh)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "refresh_token",
		Value:    newRefreshToken.Plaintext,
		Path:     "/",
		MaxAge:   604800,
		HttpOnly: true,
		Secure:   app.config.Env == "production",
		SameSite: http.SameSiteStrictMode,
	})

	web.WriteJSON(w, http.StatusOK, web.Envelope{"access_token": newAccessToken.Plaintext}, nil)
}
