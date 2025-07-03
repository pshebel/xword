package main

import (
	"log"

	"github.com/pshebel/xword/backend/utils"
	"github.com/pshebel/xword/backend/server"
)


func main() {
	_, err := utils.InitDB()
	if err != nil {
		log.Fatal(err)
		return
	}

	srv := server.InitServer()

	if err := srv.ListenAndServe(); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
