package database

import (
	"log"
	"database/sql"

	"github.com/pshebel/xword/backend/env"
	_ "github.com/mattn/go-sqlite3"
)

func init() {
	db, err := sql.Open("sqlite3", env.DB)
	if err != nil {
		log.Println(err)
	}
	defer db.Close()

	// run migrations
	log.Printf("database initialized")
}

func GetDB() (*sql.DB, error) {
	return sql.Open("sqlite3", env.DB)
}
