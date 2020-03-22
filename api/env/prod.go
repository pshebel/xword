package env

import (
	"os"
)

var (
	MariaHost = os.Getenv("MARIA_HOST")
	MariaUser = os.Getenv("MARIA_USER")
	MariaPW   = os.Getenv("MARIA_PW")
	MariaDB   = os.Getenv("MARIA_DB")
)
