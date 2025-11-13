package utils

import (
	"time"
	"database/sql"
	"fmt"

	"github.com/pshebel/xword/backend/env"

	_ "github.com/lib/pq"
)

var pool *sql.DB

func ConnectPostgres() error {
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		env.PGHOST, env.PGPORT, env.PGUSER, env.PGPASSWORD, env.PGDATABASE, env.PGSSLMODE,
	)

	// Open does not establish a connection immediately
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return fmt.Errorf("failed to open connection: %w", err)
	}

	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)
	db.SetConnMaxIdleTime(5 * time.Minute)
	db.SetConnMaxLifetime(1 * time.Hour)

	// Verify the connection
	if err := db.Ping(); err != nil {
		db.Close()
		return fmt.Errorf("failed to ping database: %w", err)
	}

	pool = db

	return nil
}

func GetDB() (*sql.DB, error) {
	if pool == nil {
		return nil, fmt.Errorf("failed to get connection")
	}
	return pool, nil
}