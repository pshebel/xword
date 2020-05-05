package xword

import (
	"context"
	"errors"
	"fmt"
	"strings"
)

func Build(ctx context.Context, wordLen int, h, v, words []string) ([]string, error) {
	// fmt.Println("Building", h, v)

	m := make([][]string, wordLen)
	for i := 0; i < wordLen; i++ {
		// filter words for only those that could exist
		// on a down given the previous rows that have been completed
		w := FilterWords(v[i], words)
		// get letters at the next index of possible words
		m[i] = GetLetters(len(v[i]), w)
	}

	// builds a word given a list of letters at each index of the across
	n, err := BuildWords(m, words)
	if err != nil {
		return nil, err
	}

	// check to see if we are done
	if len(h) == (wordLen - 1) {
		return append(h, n[0]), nil
	}

	emps := len(n)
	ch := make(chan []string, emps)

	for _, next := range n {
		go func(next string) {
			vl := make([]string, wordLen)
			// we have a potential next row. add the letters to
			// the down lists so we can keep track of the prefix
			for i, l := range strings.Split(next, "") {
				vl[i] = v[i] + l
			}
			hl := append(h, next)
			xword, err := Build(wordLen, hl, vl, searchRemove(words, next))
			if err != nil {
				// fmt.Println("failed to build xword")
			}
			select {
			case ch <- xword:
				fmt.Println("manager : sent signal", xword)
			default:
				fmt.Println("manager : dropped data")
			}
		}(next)
	}

	for emps > 0 {
		p := <-ch
		emps--
		if len(p) == wordLen {
			fmt.Println(p)
			close(ch)
			return p, nil
		}
	}

	return nil, errors.New("No possible crosswords")
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
