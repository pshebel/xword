package transport

import (
	"encoding/json"
	// "fmt"
	"net/http"

	// "github.com/pshebel/xword/backend/models"
	"github.com/pshebel/xword/backend/operations"
)

func GetPuzzleHandler(w http.ResponseWriter, r *http.Request) {
	puzzle, err := operations.GetPuzzle()
	if err != nil {
		http.Error(w, "puzzle not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(puzzle)
}
