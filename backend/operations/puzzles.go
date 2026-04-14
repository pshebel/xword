package operations

import (
	"time"
	"log/slog"

	"github.com/pshebel/xword/backend/models"
	"github.com/pshebel/xword/backend/database"
)

func getEffectiveDate() string {
	// Load EST/EDT location
	loc, _ := time.LoadLocation("America/New_York")
	
	// Get the current time in that specific zone
	now := time.Now().In(loc)
	
	// Define today's 7:00 AM in the same zone
	cutoff := time.Date(now.Year(), now.Month(), now.Day(), 7, 0, 0, 0, loc)

	if now.Before(cutoff) {
		// It's before 7am, return yesterday
		return now.AddDate(0, 0, -1).Format("2006-01-02")
	}
	
	// It's 7am or later, return today
	return now.Format("2006-01-02")
}

func GetPuzzle() (models.Puzzle, *models.Response) {
	resp := models.Puzzle{}
	db, err := database.GetDB()
	if err != nil {
		slog.Error("database connection failed", err)
		return resp, &models.Response{Code: 500, Message: "Service Error"}
	}	
	// time := getEffectiveDate()

	// query := `SELECT id, size, cert FROM puzzles WHERE date=? LIMIT 1`
	// row := db.QueryRow(query, time)
	query := `SELECT id, size, cert FROM puzzles LIMIT 1`
	row := db.QueryRow(query)
	var id, size int
	var cert string
	err = row.Scan(&id, &size, &cert)
	if err != nil {
		slog.Error("unable to find puzzle", err)
		return resp, &models.Response{Code: 404, Message: "Puzzle not found"}
	}


	rows, err := db.Query(`
		SELECT
			id,
			clue, 
			across, 
			idx 
		FROM puzzle_words
		WHERE puzzle_id=?
	`, id)
	if err != nil {
		slog.Error("query failed", err)
		return resp, &models.Response{Code: 500, Message: "Service Error"}
	}
	defer rows.Close()

	words := []models.Word{}
	for rows.Next() {
		var clue string
		var id, idx int
		var across bool
		err := rows.Scan(&id, &clue, &across, &idx)
		if err != nil {
			slog.Error("row scan failed", "error", err)
			return resp, &models.Response{Code: 500, Message: "Service Error"}
		}
		word := models.Word{
			ID: id,
			Across: across,
			Index: idx,
			Clue: clue,
		}
		words = append(words, word)
	}
	block := []int{}
	i := 0
	for _, r := range cert {
		if r == ',' {
			continue
		}
		if r == '*' {
			block = append(block, i)
		}
		i+=1
	}

	resp = models.Puzzle{
		ID: id,
		Size: size,
		Cert: cert,
		Words: words,
		Block: block,
	}
	return resp, nil
}
