package main

import (
	"log"

	"github.com/pshebel/xword/backend/server"
)


func main() {

	srv := server.InitServer()

	if err := srv.ListenAndServe(); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
