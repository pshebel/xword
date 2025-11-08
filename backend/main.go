package main

import (
	"log"

	"github.com/pshebel/xword/backend/server"
	"github.com/pshebel/xword/backend/env"

)


func main() {
	env.InitEnv()
	srv := server.InitServer()

	if err := srv.ListenAndServe(); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
