package server

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
	"github.com/pshebel/xword/backend/transport"
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

	corsObj := handlers.AllowedOrigins([]string{"*"})

	srv := &http.Server{
		Handler:      handlers.CORS(corsObj)(r),
		Addr:         ":4000",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	return srv
}