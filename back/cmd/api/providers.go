package main

import (
	"errors"
	"github.com/wjdittmar/textCare/back/internal/data"
	"github.com/wjdittmar/textCare/back/internal/validator"
	"github.com/wjdittmar/textCare/back/internal/web"
	"net/http"
)

func (app *application) createProviderHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Name           string `json:"name"`
		Specialization string `json:"specialization"`
		Education      string `json:"education"`
		Description    string `json:"description"`
		Location       string `json:"location"`
	}

	err := web.ReadJSON(w, r, &input)
	if err != nil {
		app.errorHandler.BadRequestResponse(w, r, err)
		return
	}

	provider := &data.Provider{
		Name:           input.Name,
		Specialization: input.Specialization,
		Education:      input.Education,
		Description:    input.Description,
		Location:       input.Location,
	}

	// could perform validation here

	v := validator.New()

	err = app.models.Providers.Insert(provider)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrDuplicateProviderName):
			v.AddError("name", "a provider with this name already exists")
			app.errorHandler.FailedValidationResponse(w, r, v.Errors)
		default:
			app.errorHandler.ServerErrorResponse(w, r, err)
		}
		return
	}

	err = web.WriteJSON(w, http.StatusCreated, web.Envelope{"provider": provider}, nil)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
	}
}

func (app *application) getProviderHandler(w http.ResponseWriter, r *http.Request) {

	id, err := web.ReadIDParam(r)

	if err != nil {
		app.errorHandler.NotFoundResponse(w, r)
		return
	}

	provider, err := app.models.Providers.GetByID(id)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.errorHandler.NotFoundResponse(w, r)
		default:
			app.errorHandler.ServerErrorResponse(w, r, err)
		}
		return
	}

	err = web.WriteJSON(w, http.StatusOK, web.Envelope{"provider": provider}, nil)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
	}
}

func (app *application) updateProviderHandler(w http.ResponseWriter, r *http.Request) {

	id, err := web.ReadIDParam(r)

	if err != nil {
		app.errorHandler.NotFoundResponse(w, r)
		return
	}

	existingProvider, err := app.models.Providers.GetByID(id)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.errorHandler.NotFoundResponse(w, r)
		default:
			app.errorHandler.ServerErrorResponse(w, r, err)
		}
		return
	}

	var input struct {
		Name           *string `json:"name"`
		Specialization *string `json:"specialization"`
		Education      *string `json:"education"`
		Description    *string `json:"description"`
		Location       *string `json:"location"`
	}

	err = web.ReadJSON(w, r, &input)
	if err != nil {
		app.errorHandler.BadRequestResponse(w, r, err)
		return
	}

	if input.Name != nil {
		existingProvider.Name = *input.Name
	}
	if input.Specialization != nil {
		existingProvider.Specialization = *input.Specialization
	}
	if input.Education != nil {
		existingProvider.Education = *input.Education
	}
	if input.Description != nil {
		existingProvider.Description = *input.Description
	}
	if input.Location != nil {
		existingProvider.Location = *input.Location
	}

	// could add additional validation here

	err = app.models.Providers.Update(existingProvider)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrEditConflict):
			app.errorHandler.EditConflictResponse(w, r)
		default:
			app.errorHandler.ServerErrorResponse(w, r, err)
		}
		return
	}

	err = web.WriteJSON(w, http.StatusOK, web.Envelope{"provider": existingProvider}, nil)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
	}
}

func (app *application) listProvidersHandler(w http.ResponseWriter, r *http.Request) {

	var input struct {
		Location string
	}

	qs := r.URL.Query()

	input.Location = web.ReadString(qs, "location", "")

	providers, err := app.models.Providers.GetAll(input.Location)

	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
		return
	}

	err = web.WriteJSON(w, http.StatusOK, web.Envelope{"providers": providers}, nil)
	if err != nil {
		app.errorHandler.ServerErrorResponse(w, r, err)
	}

}
