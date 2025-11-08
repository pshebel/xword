package transport

import (
	"encoding/json"
	// "fmt"
	"net/http"

	"github.com/pshebel/xword/backend/models"
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

func PostCheckHandler(w http.ResponseWriter, r *http.Request) {
	var req models.CheckRequest
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, "invalid request body", http.StatusBadRequest)
        return
    }
	res, err := operations.CheckPuzzle(req)
	if err != nil {
		http.Error(w, "puzzle not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(res)
}

