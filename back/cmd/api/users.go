package main

import (
	"errors"

	"net/http"

	"github.com/wjdittmar/textCare/back/internal/data"
	"github.com/wjdittmar/textCare/back/internal/validator"
	"github.com/wjdittmar/textCare/back/internal/web"
)

func (app *application) registerUserHandler(w http.ResponseWriter, r *http.Request) {

	var input struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	err := web.ReadJSON(w, r, &input)
	if err != nil {
		app.errorHandler.BadRequestResponse(w, r, err)
		return
	}
	user := &data.User{
		Name:  input.Name,
		Email: input.Email,
	}
	err = user.Password.Set(input.Password)
	if err != nil {

		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}
	v := validator.New()

	if data.ValidateRegisterUser(v, user); !v.Valid() {
		app.errorHandler.FailedValidationResponse(w, r, v.Errors)
		return
	}

	err = app.models.Users.Insert(user)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrDuplicateEmail):
			v.AddError("email", "a user with this email address already exists")
			app.errorHandler.FailedValidationResponse(w, r, v.Errors)
		default:
			app.errorHandler.ServerErrorResponse(w, r, err)
		}
		return
	}

	app.models.Permissions.AddForUser(user.ID, "providers:read")
	app.models.Permissions.AddForUser(user.ID, "providers:write")
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	err = web.WriteJSON(w, http.StatusAccepted, web.Envelope{"user": user}, nil)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
	}
}

func (app *application) updateProviderForUser(w http.ResponseWriter, r *http.Request) {
	userContext := app.contextGetUser(r)

	user, err := app.models.Users.Get(userContext.ID)

	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
	}

	var input struct {
		Name       *string `json:"name"`
		Email      *string `json:"email"`
		ProviderID *int64  `json:"provider_id"`
	}

	err = web.ReadJSON(w, r, &input)
	if err != nil {
		app.errorHandler.BadRequestResponse(w, r, err)
		return
	}

	if input.Name != nil {
		user.Name = *input.Name
	}
	if input.Email != nil {
		user.Email = *input.Email
	}
	if input.ProviderID != nil {
		user.ProviderID = *input.ProviderID
	}

	v := validator.New()
	if data.ValidateReturnUser(v, user); !v.Valid() {
		app.errorHandler.FailedValidationResponse(w, r, v.Errors)
		return
	}
	err = app.models.Users.Update(user)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}
}

func (app *application) checkUserExistsHandler(w http.ResponseWriter, r *http.Request) {

	email := r.URL.Query().Get("email")
	if email == "" {
		app.errorHandler.BadRequestResponse(w, r, errors.New("missing email query parameter"))
		return
	}

	// Check if the user exists using a method on your Users model.
	exists, err := app.models.Users.ExistsByEmail(email)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	if err := web.WriteJSON(w, http.StatusOK, web.Envelope{"exists": exists}, nil); err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}
}
