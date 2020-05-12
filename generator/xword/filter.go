package xword

// FilterWords takes a prefix and a list of words and returns words that
// match the prefix
func FilterWords(prefix string, words []string) []string {
	var matches []string
	for _, w := range words {
		if w[:len(prefix)] == prefix {
			matches = append(matches, w)
		}
	}
	return matches
}

// GetLetters gets a list of letters at the correct index
func GetLetters(index int, words []string) []string {
	lm := make(map[string]bool)
	var letters []string
	for _, w := range words {
		// split word into slice and get the letter at the correct index
		letter := string(w[index])
		if !lm[letter] {
			lm[letter] = true
			letters = append(letters, letter)
		}
	}
	return letters
}

// BuildWords takes a list, and at each index is a list of letters that
// could be in that index. Using this it builds a word
func BuildWords(matrix [][]string, words []string) []string {
	var found []string
	for _, word := range words {
		isWord := 0
		for i, row := range matrix {
			for _, col := range row {
				if col == string(word[i]) {
					isWord++
				}
			}
		}
		if isWord == len(matrix) {
			found = append(found, word)
		}
	}
	return found
}
