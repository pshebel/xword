package transport

import (
	"encoding/json"
	"net/http"

	"github.com/pshebel/xword/backend/models"
	"github.com/pshebel/xword/backend/database"

)

func GetHealthHandler(w http.ResponseWriter, r *http.Request) {
	_, err := database.GetDB()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
        	json.NewEncoder(w).Encode(models.Response{
            		Code:    500,
            		Message: "failed to connect to db",
        	})
        	return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(models.Response{Code: 200, Message: "success"})
}
