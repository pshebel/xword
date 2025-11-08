package operations

import (
	"fmt"
	// "database/sql"
	"log"
	// "time"

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

	query := `SELECT id, size
			FROM puzzles
			ORDER BY RANDOM()
			LIMIT 1`

	row := db.QueryRow(query)
	var (
		id string
		size int
	)
	err = row.Scan(&id, &size)
	if err != nil {
		log.Fatal(err)
		return puzzle, err
	}

	puzzle.ID = id
	puzzle.Size = size
	query = `
		SELECT
			w.text AS word_text,
			c.text AS clue_text,
			pw.across,
			pw.idx
		FROM puzzle_words pw
		JOIN words w ON pw.word_id = w.id
		JOIN clues c ON w.id = c.word_id
		WHERE pw.puzzle_id = ?
	`

	rows, err := db.Query(query, id)
	if err != nil {
		log.Fatal(err)
		return puzzle, err
	}
	defer rows.Close()
	block := []int{}
	clues := []models.Clue{}

	for rows.Next() {
		clue := models.Clue{}
		var word string
		err := rows.Scan(&word, &clue.Text, &clue.Across, &clue.Index)
		if err != nil {
			log.Fatal(err)
			return puzzle, err
		}
		if (clue.Across) {
			for i:=0;i <len(word);i++ {
				if (string(word[i]) == "*") {
					block = append(block, clue.Index*size + i);
				}
			}
		}

		clues = append(clues, clue)
	}

	puzzle.Block = block
	puzzle.Clues = clues
	return puzzle, nil
}

func CheckPuzzle(req models.CheckRequest) (models.CheckResponse, error) {
	res := models.CheckResponse{ID: req.ID}
	db, err := utils.Open()
	if err != nil {
		log.Fatal(err)
		return res, err
	}

	query := `SELECT pw.idx, w.text
		FROM puzzle_words AS pw LEFT JOIN words as w ON pw.word_id = w.id
		WHERE puzzle_id = ? AND across = true
	`
	rows, err := db.Query(query, req.ID)
	if err != nil {
		log.Fatal(err)
		return res, err
	}

	success := true
	for rows.Next() {
		var (
			idx int
			word string
		)

		err := rows.Scan(&idx, &word)
		if err != nil {
			log.Fatal(err)
			return res, err
		}
		if (req.Words[idx] != word) {
			fmt.Println(req.Words[idx], word)
			success = false
			break
		}
	}
	res.Success = success
	return res, nil
} 