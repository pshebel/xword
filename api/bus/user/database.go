package user

import (
	"context"
	"database/sql"

	"github.com/pshebel/xword/api/constant"
	"github.com/pshebel/xword/api/models"
	"github.com/pshebel/xword/util/db"
	"github.com/pshebel/xword/util/log"
)

func GetUsers(ctx context.Context) (models.Users, error) {
	log.Debug("getting all users")
	var users models.Users
	conn := db.MysqlConnect()
	query := `SELECT name, words, puzzles FROM ` + constant.Users
	rows, err := conn.QueryContext(ctx, query)
	if err != nil {
		log.Debug("failed to get users: %v", err)
		return users, err
	}
	for rows.Next() {
		var user models.User
		err := rows.Scan(&user.Username, &user.Words, &user.Puzzles)
		if err != nil {
			log.Debug("failed to scan user: %v", err)
			return nil, err
		}
		users = append(users, &user)
	}
	return users, nil
}

func PutUser(ctx context.Context, username string) (models.User, error) {
	log.Debug("update user")

	user := models.User{
		Username: &username,
	}
	conn := db.MysqlConnect()
	query := `SELECT words, puzzles FROM ` + constant.Users + ` WHERE name=?`
	row := conn.QueryRowContext(ctx, query, username)
	err := row.Scan(&user.Words, &user.Puzzles)
	if err != nil {
		// Check if user doesn't exist yet and insert them
		// If they are new users the puzzle and word count
		// will both be zero, which isn't returned by swagger
		if err == sql.ErrNoRows {
			log.Debug("inserting user")
			query := `INSERT INTO ` + constant.Users + `(name) VALUES (?)`

			res, err := conn.ExecContext(ctx, query, username)
			if err != nil {
				log.Debug("failed to insert user: %v", err)
				return user, err
			}
			_, err = db.CheckInsert(res, 1)
			if err != nil {
				log.Debug("failed to insert user: %v", err)
				return user, err
			}
		} else {
			log.Debug("failed to get user: %v", err)
			return user, err
		}
	}
	log.Debug("got user %v", user)

	return user, nil
}
