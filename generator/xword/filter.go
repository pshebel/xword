package xword

import (
	"fmt"
	re "regexp"
	"strconv"
	"strings"
)

func Filter(prefix string, wordLen int, words []string) []string {
	fmt.Println("Filter", prefix)
	prefixLen := len(prefix)
	fw := make(map[string]bool)
	l := strconv.Itoa(wordLen - prefixLen)
	re := re.MustCompile("^" + prefix + "[a-z]{" + l + "}$")
	for _, w := range words {
		m := re.Match([]byte(w))
		if m {
			w = strings.Split(w, "")[prefixLen]
			fw[w] = true
		}
	}
	var letters []string
	for k := range fw {
		letters = append(letters, k)
	}
	return letters
}
