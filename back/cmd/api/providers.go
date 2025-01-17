package main

import (
	"errors"
	"github.com/wjdittmar/textCare/back/internal/data"
	"github.com/wjdittmar/textCare/back/internal/validator"
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

	err := app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
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
			app.failedValidationResponse(w, r, v.Errors)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.writeJSON(w, http.StatusCreated, envelope{"provider": provider}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) getProviderHandler(w http.ResponseWriter, r *http.Request) {

	id, err := app.readIDParam(r)

	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	provider, err := app.models.Providers.GetByID(id)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.notFoundResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"provider": provider}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}

func (app *application) updateProviderHandler(w http.ResponseWriter, r *http.Request) {

	id, err := app.readIDParam(r)

	if err != nil {
		app.notFoundResponse(w, r)
		return
	}

	existingProvider, err := app.models.Providers.GetByID(id)
	if err != nil {
		switch {
		case errors.Is(err, data.ErrRecordNotFound):
			app.notFoundResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
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

	err = app.readJSON(w, r, &input)
	if err != nil {
		app.badRequestResponse(w, r, err)
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
			app.editConflictResponse(w, r)
		default:
			app.serverErrorResponse(w, r, err)
		}
		return
	}

	err = app.writeJSON(w, http.StatusOK, envelope{"provider": existingProvider}, nil)
	if err != nil {
		app.serverErrorResponse(w, r, err)
	}
}
