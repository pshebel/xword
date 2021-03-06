package db

import (
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/pshebel/xword/api/env"
	"github.com/pshebel/xword/util/log"
)

var (
	Pool *sql.DB
)

func InitDBPool() error {
	url := env.MariaUser + ":" + env.MariaPW + "@tcp(" + env.MariaHost + ")/" + env.MariaDB
	fmt.Println("url", url)
	db, err := sql.Open("mysql", url)
	if err != nil {
		log.Debug("failed to connect to db %v", err)
		return err
	}
	Pool = db
	return nil
}

func MysqlConnect() *sql.DB {
	return Pool
}

// checks if insert was successfully and returns last inserted id
func CheckInsert(res sql.Result, numRows int64) (int64, error) {
	count, err := res.RowsAffected()
	if err != nil {
		log.Debug("failed to get row affected count: %v", err)
		return 0, err
	}

	if count != numRows {
		err := errors.New("incorrect number of rows effected")
		log.Debug("incorrect number of rows effected")
		return 0, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		log.Debug("failed to get last id %v", err)
		return 0, err
	}
	return id, nil
}
