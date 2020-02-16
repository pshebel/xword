package word

import (
	"context"
	"database/sql"

	"github.com/pshebel/xword/api/constant"
	"github.com/pshebel/xword/api/models"
	"github.com/pshebel/xword/util/db"
	"github.com/pshebel/xword/util/log"
)

func GetWords(ctx context.Context, length *int64) (models.Words, error) {
	log.Debug("getting all words")
	var words models.Words
	conn := db.MysqlConnect()
	query := `SELECT word, word_len, definition FROM ` + constant.Words
	var args []interface{}
	if length != nil {
		query += ` WHERE word_len=?`
		args = append(args, *length)
	}
	rows, err := conn.QueryContext(ctx, query, args...)
	if err != nil {
		log.Debug("failed to get users: %v", err)
		return words, err
	}
	for rows.Next() {
		var word models.Word
		err := rows.Scan(&word.Word, &word.WordLength, &word.Definition)
		if err != nil {
			log.Debug("failed to scan user: %v", err)
			return nil, err
		}
		words = append(words, &word)
	}
	return words, nil
}

func PostWord(ctx context.Context, word models.Word, username string) error {
	log.Debug("inserting word %v", word)
	conn := db.MysqlConnect()
	opts := sql.TxOptions{}
	tx, err := conn.BeginTx(ctx, &opts)
	if err != nil {
		log.Debug("failed to create transaction", err)
		return err
	}
	// insert word
	query := `INSERT INTO ` + constant.Words +
		`(word, word_len, definition, submitter) VALUES (?, ?, ?, ?)`

	res, err := tx.ExecContext(ctx, query, *word.Word, len(*word.Word), *word.Definition, username)
	if err != nil {
		log.Debug("failed to insert word: %v", err)
		tx.Rollback()
		return err
	}
	_, err = db.CheckInsert(res, 1)
	if err != nil {
		log.Debug("failed to insert word: %v", err)
		tx.Rollback()
		return err
	}

	// update user
	query = `UPDATE ` + constant.Users + ` SET words=words+1 WHERE name=?`
	res, err = tx.ExecContext(ctx, query, username)
	if err != nil {
		log.Debug("failed to update user: %v", err)
		tx.Rollback()
		return err
	}
	_, err = db.CheckInsert(res, 1)
	if err != nil {
		log.Debug("failed to update user: %v", err)
		tx.Rollback()
		return err
	}
	err = tx.Commit()
	if err != nil {
		log.Debug("failed to commit word insert %v", err)
		return err
	}
	return nil
}
