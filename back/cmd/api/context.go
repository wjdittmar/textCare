package main

import (
	"context"
	"github.com/wjdittmar/textCare/back/internal/data"
	"net/http"
)

// Define a custom contextKey type, with the underlying type string.
// this is considered best practice to avoid collisions
type contextKey string

const userContextKey = contextKey("user")

func (app *application) contextSetUser(r *http.Request, user *data.User) *http.Request {
	// note this is instead of
	//  := context.WithValue(r.Context(), "user", user)
	ctx := context.WithValue(r.Context(), userContextKey, user)
	return r.WithContext(ctx)
}

func (app *application) contextGetUser(r *http.Request) *data.User {
	user, ok := r.Context().Value(userContextKey).(*data.User)
	if !ok {
		panic("missing user value in request context")
	}
	return user
}
