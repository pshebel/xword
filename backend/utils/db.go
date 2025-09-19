package utils

import (
	"log"
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	// "github.com/golang-migrate/migrate/v4"
    // "github.com/golang-migrate/migrate/v4/database/sqlite3"
	// _ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/pshebel/xword/backend/env"
)

// For when we need to start handling db migrations programatically

// func InitDB() (*sql.DB, error) {
// 	db, err := sql.Open("sqlite3", env.DbPath)
// 	if err != nil {
// 		log.Fatal("failed to open sqlite3 file: ", err)
// 		return nil, err
// 	}
// 	defer db.Close()

// 	config := sqlite3.Config{}

// 	// migrate
// 	driver, err := sqlite3.WithInstance(db, &config)
// 	if err != nil {
// 		log.Fatal("failed to initialize sqlite3 driver: ", err)
// 		return nil, err
// 	}
	
// 	m, err := migrate.NewWithDatabaseInstance(env.DbMigrations,"ql", driver)
// 	if err != nil {
// 		log.Fatal("failed to migrate database: ", err)
// 		return nil, err
// 	}

//     err = m.Up() 
// 	if err != nil && err != migrate.ErrNoChange {
// 		log.Fatal("failed migrate up: ", err)
// 		return nil, err
// 	}

// 	return db, nil
// }

func Open() (*sql.DB, error) {
	fmt.Println("env dbpath", env.DbPath)
	db, err := sql.Open("sqlite3", env.DbPath)
	if err != nil {
		log.Fatal("failed to open sqlite3 file: ", err)
		return nil, err
	}
	return db, nil
}