package env

import (
	"os"
)

var (
	DbPath = os.Getenv("DB_PATH")
	DbMigrations = "file://"+os.Getenv("DB_MIGRATIONS")
	ApiPort = os.Getenv("API_PORT")
)