package operations

import (
	// "fmt"
	// "database/sql"
	"log"

	"github.com/pshebel/xword/backend/models"
	"github.com/pshebel/xword/backend/utils"
)


func GetPuzzle() (models.Puzzle, error) {
	puzzle := models.Puzzle{}
	db, err := utils.Open()
	if err != nil {
		log.Fatal(err)
		return puzzle, err
	}

	query := `SELECT id, size, hash
			FROM puzzles
			ORDER BY RANDOM()
			LIMIT 1`

	row := db.QueryRow(query)
	var (
		id int
		size int
		hash string
	)
	err = row.Scan(&id, &size, &hash)
	if err != nil {
		log.Fatal(err)
		return puzzle, err
	}

	puzzle.ID = id
	puzzle.Size = size
	puzzle.Hash = hash

	query = `SELECT w.id, pw.across, pw.idx, w.clue
		FROM words AS w
		JOIN puzzle_words AS pw ON pw.word_id = w.id
		WHERE pw.puzzle_id = ?
	`

	rows, err := db.Query(query, id)
	if err != nil {
		log.Fatal(err)
		return puzzle, err
	}
	defer rows.Close()

	across := []models.Clue{}
	down := []models.Clue{}
	for rows.Next() {
		var (
			id int
			isAcross bool
			index int
			text string
		)
		err := rows.Scan(&id, &isAcross, &index, &text)
		if err != nil {
			log.Fatal(err)
			return puzzle, err
		}
		if (isAcross) {
			across = append(across, models.Clue{index, text})
		} else {
			down = append(down, models.Clue{index, text})
		}
	}

	puzzle.Across = across
	puzzle.Down = down
	return puzzle, nil
}