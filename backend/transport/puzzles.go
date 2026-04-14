package transport

import (
	"encoding/json"
	"net/http"

	"github.com/pshebel/xword/backend/models"
	"github.com/pshebel/xword/backend/operations"
)

func GetPuzzleHandler(w http.ResponseWriter, r *http.Request) {
	resp, err := operations.GetPuzzle()
	if err != nil {
		resp := models.Response{
			Code: 500,
			Message: "failed to get puzzle",
		}
		json.NewEncoder(w).Encode(resp)
        return
	}
	json.NewEncoder(w).Encode(resp)	

}
