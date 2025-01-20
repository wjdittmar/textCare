package main

import (

	"net/http"
)

func (app *application) getIcd10Handler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		QueryString string
	}

	qs := r.URL.Query()

	input.QueryString = app.readString(qs, "qs", "")

}
