package server

import (
	"log"
	"net/http"
	"fmt"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
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

	r.HandleFunc("/api/puzzle", transport.GetPuzzleHandler).Methods("GET")
	r.HandleFunc("/api/check", transport.PostCheckHandler).Methods("POST")

	fmt.Println(env.AllowedOrigins)
	cors := handlers.CORS(
        handlers.AllowedOrigins(env.AllowedOrigins), // React dev server
        handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
        handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
    )


	srv := &http.Server{
		Handler:      cors(r),
		Addr:         ":4000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	return srv
}