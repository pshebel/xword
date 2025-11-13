package env

import (
	"os"
	"strings"
	"fmt"
)

var (
	ApiPort = os.Getenv("API_PORT")
	AllowedOriginsStr = os.Getenv("ALLOWED_ORIGINS")
	AllowedOrigins = []string{}
	PGHOST = os.Getenv("PGHOST")
	PGPORT = os.Getenv("PGPORT")
	PGUSER = os.Getenv("PGUSER")
	PGPASSWORD = os.Getenv("PGPASSWORD")
	PGDATABASE = os.Getenv("PGDATABASE")
	PGSSLMODE =	os.Getenv("PGSSLMODE")
)


func InitEnv() {
	if AllowedOriginsStr != "" {
		AllowedOrigins = strings.Split(AllowedOriginsStr, ",")
	}
	fmt.Println(AllowedOriginsStr)
	fmt.Println(AllowedOrigins)
}