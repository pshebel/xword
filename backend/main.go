package main

import (
	"log"

	"github.com/pshebel/xword/backend/env"
	"github.com/pshebel/xword/backend/server"
	"github.com/pshebel/xword/backend/utils"
)

func main() {
	env.InitEnv()

	err := utils.ConnectPostgres()
	if err != nil {
		log.Fatal("Server failed to connect to db:", err)
	}
	srv := server.InitServer()
	err = srv.ListenAndServe()
	if err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
