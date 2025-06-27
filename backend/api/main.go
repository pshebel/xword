package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello from custom mux!")
}

func handler2(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Another endpoint")
}

func main() {
	// init db
	

	// init routes

	mux := http.NewServeMux()
	mux.HandleFunc("/hello", handler)
	mux.HandleFunc("/another", handler2)
	http.ListenAndServe(":8081", mux)
}
