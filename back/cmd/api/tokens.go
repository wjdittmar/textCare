package main

import (
	"errors"
	"github.com/wjdittmar/textCare/back/internal/data"
	"github.com/wjdittmar/textCare/back/internal/validator"
	"net/http"
	"time"
)

func (app *application) createAuthenticationTokenHandler(w http.ResponseWriter, r *http.Request) {

	var input struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
		return
	}
	v := validator.New()
	data.ValidateEmail(v, input.Email)
	data.ValidatePasswordPlaintext(v, input.Password)
	if !v.Valid() {
		app.failedValidationResponse(w, r, v.Errors)
		return
	}

	user, err := app.models.Users.GetByEmail(input.Email)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.invalidCredentialsResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	match, err := user.Password.Matches(input.Password)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	if !match {
		app.invalidCredentialsResponse(w, r)
		return
	}

	accessToken, err := app.models.Tokens.New(user.ID, 15*time.Minute, data.ScopeAuthentication)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	refreshToken, err := app.models.Tokens.New(user.ID, 24*time.Hour*7, data.ScopeRefresh)
	if err != nil {
		app.serverErrorResponse(w, r, err)
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

	err = app.writeJSON(w, http.StatusCreated, envelope{"access_token": accessToken.Plaintext}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) refreshAuthenticationTokenHandler(w http.ResponseWriter, r *http.Request) {

	cookie, err := r.Cookie("refresh_token")
	if err != nil {
		app.authenticationRequiredResponse(w, r)
		return
	}

	token, err := app.models.Tokens.GetForToken(cookie.Value)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.authenticationRequiredResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.models.Tokens.DeleteAllForUser(data.ScopeRefresh, token.UserID)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	newAccessToken, err := app.models.Tokens.New(token.UserID, 15*time.Minute, data.ScopeAuthentication)
	if err != nil {
		app.serverErrorResponse(w, r, err)
		return
	}

	newRefreshToken, err := app.models.Tokens.New(token.UserID, 24*time.Hour*7, data.ScopeRefresh)
	if err != nil {
		app.serverErrorResponse(w, r, err)
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

	app.writeJSON(w, http.StatusOK, envelope{"access_token": newAccessToken.Plaintext}, nil)
}
