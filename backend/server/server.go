package server

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/pshebel/xword/backend/transport"
	"github.com/pshebel/xword/backend/env"
)

var startTime = time.Now()

// Middleware for logging requests
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
	})
}


func InitServer() (*http.Server) {
	// Create a new router
	r := mux.NewRouter()

	// Apply middleware
	r.Use(loggingMiddleware)

	r.HandleFunc("/api/", transport.GetPuzzleHandler).Methods("GET")

	srv := &http.Server{
		Handler:      r,
		Addr:         ":"+env.ApiPort,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	return srv
}