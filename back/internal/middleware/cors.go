package middleware

import (
	"net/http"
	"strings"
)

func CORS(allowedOrigins []string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Add("Vary", "Origin")
			w.Header().Add("Vary", "Access-Control-Request-Method")

			origin := r.Header.Get("Origin")
			if origin != "" && containsOrigin(allowedOrigins, origin) {
				w.Header().Set("Access-Control-Allow-Origin", origin)
				w.Header().Set("Access-Control-Allow-Credentials", "true")

				if r.Method == http.MethodOptions {
					w.Header().Set("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE")
					w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")
					w.WriteHeader(http.StatusOK)
					return
				}
			}

			next.ServeHTTP(w, r)
		})
	}
}

func containsOrigin(allowed []string, origin string) bool {
	for _, o := range allowed {
		if strings.EqualFold(o, origin) {
			return true
		}
	}
	return false
}
