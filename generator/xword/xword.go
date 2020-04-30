package xword

import (
	"fmt"
	"math/rand"
	"strings"
	"time"

	w "github.com/pshebel/xword/generator/word"
)

func Build(wordLen int, words []string) ([]string, error) {
	// initialize xword
	rand.Seed(time.Now().UTC().UnixNano())
	n := len(words)
	fmt.Println(n)
	sidx := rand.Intn(n)
	seed := words[sidx]
	words = remove(words, sidx)

	xword := []string{seed}
	h := seed
	// keeps track of the down words
	v := make([][]string, wordLen)
	for i, l := range strings.Split(h, "") {
		v[i] = append(v[i], l)
	}
	// build xword
	for x := 0; x < wordLen-1; x++ {
		// filters list of words based on the possible
		// down words
		m := make([][]string, wordLen)
		for i := 0; i < wordLen; i++ {
			prefix := strings.Join(v[i], "")
			m[i] = Filter(prefix, wordLen, words)
		}
		// builds a word given a list of letters at each index of the across
		n, err := w.Build(m, words)
		if err != nil {
			return nil, err
		}

		next := n[rand.Intn(len(n))]
		for i, l := range strings.Split(next, "") {
			v[i] = append(v[i], l)
		}
		words = searchRemove(words, next)
		fmt.Println(m)
		xword = append(xword, next)
	}

	return xword, nil
}

func remove(list []string, index int) []string {
	return append(list[:index], list[index+1:]...)
}

func searchRemove(list []string, target string) []string {
	for i, l := range list {
		if l == target {
			return append(list[:i], list[i+1:]...)
		}
	}
	return list
}
