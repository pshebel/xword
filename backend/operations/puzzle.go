package operations

import (
	// "fmt"
	// "database/sql"
	"log"

	"github.com/pshebel/xword/backend/models"
	"github.com/pshebel/xword/backend/utils"
)


func GetPuzzle() (models.Puzzle, error) {
	db := utils.Open()
	puzzle := models.Puzzle{}

	query := `SELECT id
			FROM puzzles
			ORDER BY RANDOM()
			LIMIT 1`

	row := db.QueryRow(query)
	var (
		id int
	)
	err := row.Scan(&id)
	if err != nil {
		log.Fatal(err)
		return puzzle, err
	}

	query = `SELECT w.id, pw.across, pw.index, w.clue
		FROM words AS w
		JOIN puzzle_words AS pw ON pw.word_id = w.id
		WHERE pw.puzzle_id = ?
		`

	puzzle.ID = id

	rows, err := db.Query(query, id)
	if err != nil {
		log.Fatal(err)
		return puzzle, err
	}
	defer rows.Close()

	words := []models.Word{}
	for rows.Next() {
		word := models.Word{}
		err := rows.Scan(&word.ID, &word.Across, &word.Index, &word.Clue)
		if err != nil {
			log.Fatal(err)
			return puzzle, err
		}

		words = append(words, word)
		
	}
	puzzle.Words = words
	return puzzle, nil
}