package xword

import (
	"context"
	"database/sql"
	"strings"

	"github.com/pshebel/xword/api/constant"
	"github.com/pshebel/xword/api/models"
	"github.com/pshebel/xword/util/db"
	"github.com/pshebel/xword/util/log"
)

func GetXword(ctx context.Context) (models.Xword, error) {
	log.Debug("getting an xword")
	var xword models.Xword
	conn := db.MysqlConnect()
	query := `SELECT x.id, x.size, w.id, xw.idx, xw.dir, w.word_len, w.definition FROM ` +
		`(SELECT * FROM ` + constant.Xwords + ` LIMIT 1) AS x ` +
		`LEFT JOIN ` + constant.XwordWords + ` AS xw ON x.id = xw.xword_id ` +
		`LEFT JOIN ` + constant.Words + ` AS w ON w.id = xw.word_id `

	rows, err := conn.QueryContext(ctx, query)
	if err != nil {
		log.Debug("failed to get xword: %v", err)
		return xword, err
	}
	var words []*models.XwordWord
	for rows.Next() {
		var word models.XwordWord
		err := rows.Scan(&xword.ID, &xword.Size, &word.WordID, &word.Idx, &word.Dir, &word.WordLen, &word.Definition)
		if err != nil {
			log.Debug("failed to scan word %v", err)
			return xword, err
		}
		words = append(words, &word)
	}
	xword.Words = words
	return xword, nil
}

func PostXword(ctx context.Context, xword models.Xword) error {
	log.Debug("inserting xword %v", xword)
	conn := db.MysqlConnect()
	opts := sql.TxOptions{}
	tx, err := conn.BeginTx(ctx, &opts)
	if err != nil {
		log.Debug("failed to create transaction %v", err)
		return err
	}

	// insert initial db
	query := `INSERT INTO ` + constant.Xwords + ` (size) VALUES (?)`
	res, err := tx.ExecContext(ctx, query, xword.Size)
	if err != nil {
		log.Debug("failed to insert xword: %v", err)
		tx.Rollback()
		return err
	}
	id, err := db.CheckInsert(res, 1)
	if err != nil {
		log.Debug("failed to insert xword: %v", err)
		tx.Rollback()
		return err
	}

	query = `INSERT INTO ` + constant.XwordWords + ` (xword_id, idx, dir, word_id) VALUES `
	var stmt []string
	var args []interface{}

	for _, word := range xword.Words {
		stmt = append(stmt, "(?, ?, ?, ?)")
		args = append(args, id, *word.Idx, *word.Dir, *word.WordID)
	}

	query += strings.Join(stmt, ",")
	res, err = tx.ExecContext(ctx, query, args...)
	if err != nil {
		log.Debug("failed to insert words for xword %v", err)
		tx.Rollback()
		return err
	}
	_, err = db.CheckInsert(res, int64(len(xword.Words)))
	if err != nil {
		log.Debug("failed to insert words for xword %v", err)
		tx.Rollback()
		return err
	}

	err = tx.Commit()
	if err != nil {
		log.Debug("failed to commit xword insert %v", err)
		return err
	}
	return nil
}

// check word compares the user input with the values in the db.
// if the values are correct, the users info is updated
func CheckXword(ctx context.Context, xword models.CheckXword, username string) (bool, error) {
	log.Debug("check an xword")

	conn := db.MysqlConnect()
	// check users input
	query := `SELECT COUNT(*) FROM ` + constant.Xwords + ` AS x ` +
		`LEFT JOIN ` + constant.XwordWords + ` AS xw ON x.id = xw.xword_id ` +
		`LEFT JOIN ` + constant.Words + ` AS w ON w.id = xw.word_id ` +
		` WHERE x.id=? AND `

	var stmt []string
	args := []interface{}{xword.XwordID}

	// check words
	for _, word := range xword.Words {
		stmt = append(stmt, "(w.id=? AND w.word=? AND xw.idx=? AND xw.dir=?)")
		args = append(args, *word.WordID, *word.Input, *word.Idx, *word.Dir)
	}
	query += "( " + strings.Join(stmt, " OR ") + " )"

	var count int64
	row := conn.QueryRowContext(ctx, query, args...)
	err := row.Scan(&count)
	if err != nil {
		log.Debug("failed to get xword %v ", err)
		return false, err
	}

	if count != int64(len(xword.Words)) {
		log.Debug("xword not solved!")
		return false, nil
	}

	// update user
	query = `UPDATE ` + constant.Users + ` SET puzzles=puzzles+1 WHERE name=?`
	res, err := conn.ExecContext(ctx, query, username)
	if err != nil {
		log.Debug("failed to update user: %v", err)
		return false, err
	}
	_, err = db.CheckInsert(res, 1)
	if err != nil {
		log.Debug("failed to update user: %v", err)
		return false, err
	}

	return true, nil
}
