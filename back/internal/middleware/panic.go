package middleware

import (
	"fmt"
	"github.com/wjdittmar/textCare/back/internal/jsonlog"
	"net/http"
)

func RecoverPanic(logger *jsonlog.Logger) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			defer func() {
				if err := recover(); err != nil {
					logger.PrintError(fmt.Errorf("%s", err), nil)
					w.Header().Set("Connection", "close")
					http.Error(w, "Internal Server Error", http.StatusInternalServerError)
				}
			}()
			next.ServeHTTP(w, r)
		})
	}
}
