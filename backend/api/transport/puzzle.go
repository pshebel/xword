package transport

import (
	"fmt"
	"net/http"
)

func GetPuzzleHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Print("get puzzle")
}

func GetPuzzleIdHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Print("get puzzle id")
}
func PostCheckPuzzleHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Print("check puzzle")
}
