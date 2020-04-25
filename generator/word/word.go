package word

import (
	"errors"
	"fmt"
	"strings"
)

// [["a", "b", "c", "d", "z"],
// ["a", "e", "i", "s", "r"],
// ["t", "r", "s", "e", "c"]]
// aat, bat, cat, ...

// take another parameter that is a channel and send words as we find them

func Build(matrix [][]string, words []string) ([]string, error) {
	fmt.Println("Build", matrix)
	var found []string

	for _, word := range words {
		w := strings.Split(word, "")
		isWord := 0
		for i, row := range matrix {
			for _, col := range row {
				if col == w[i] {
					isWord++
				}
			}
		}
		if isWord == len(matrix) {
			found = append(found, word)
		}
	}

	if len(found) == 0 {
		return nil, errors.New("No words found")
	}

	return found, nil
}
