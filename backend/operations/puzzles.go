package operations

import (
	"log/slog"
	"database/sql"

	"github.com/pshebel/partiburo/backend/models"
	"github.com/pshebel/partiburo/backend/database"
)

func getEffectiveDate() time.Time {
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

func GetPuzzle() (models.Puzzle, error) {
	db, err := database.GetDB()
	if err != nil {
		slog.Error("database connection failed", "error", err)
		return resp, &models.Response{Code: 500, Message: "Service Error"}
	}	
	time := getEffectiveDate()

	query := `SELECT id, size, cert FROM puzzle WHERE date=?`
	row := db.QueryRow(query, time)
	var id, size int
	var cert string
	err = row.Scan(&id, &size, &cert)
	if err != nil {
		slog.Error("unable to find puzzle", err)
		return resp, &models.Response{Code: 404, Message: "Puzzle not found"}
	}

	words := []models.Word{}
	rows, err := Query(`SELECT id, 
}
