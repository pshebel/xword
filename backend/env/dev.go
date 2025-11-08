package env

import (
	"os"
	"strings"
	"fmt"
)

var (
	DbPath = os.Getenv("DB_PATH")
	DbMigrations = "file://"+os.Getenv("DB_MIGRATIONS")
	ApiPort = os.Getenv("API_PORT")
	AllowedOriginsStr = os.Getenv("ALLOWED_ORIGINS")
	AllowedOrigins = []string{}
)


func InitEnv() {
	if AllowedOriginsStr != "" {
		AllowedOrigins = strings.Split(AllowedOriginsStr, ",")
	}
	fmt.Println(AllowedOriginsStr)
	fmt.Println(AllowedOrigins)
}