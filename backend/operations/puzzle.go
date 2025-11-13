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
	db, err := utils.GetDB()
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
		WITH random_prompt AS (
			SELECT id AS prompt_id
			FROM prompts
			ORDER BY RANDOM()
			LIMIT 1
		)
		SELECT
			pdw.text AS padded_word_text,
			c.text AS clue_text,
			pw.across,
			pw.idx
		FROM puzzle_words pw
		JOIN puzzles p ON p.id = $1
		JOIN padded_words pdw ON pdw.id = pw.padded_word_id
		JOIN words w ON w.id = pdw.word_id
		JOIN random_prompt rp ON TRUE
		JOIN clues c ON c.word_id = w.id AND c.prompt_id = rp.prompt_id
		WHERE pw.puzzle_id = p.id
		ORDER BY pw.idx;
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
	db, err := utils.GetDB()
	if err != nil {
		log.Fatal(err)
		return res, err
	}

	query := `SELECT pw.idx, w.text
		FROM puzzle_words AS pw LEFT JOIN padded_words as w ON pw.padded_word_id = w.id
		WHERE pw.puzzle_id = $1 AND across = TRUE
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