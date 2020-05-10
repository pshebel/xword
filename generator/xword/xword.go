package xword

import (
	"context"
	"strings"

	"github.com/pshebel/xword/sgroup"
)

func Build(ctx context.Context, wordLen int, h, v, words []string) interface{} {
	// fmt.Println("Building", h, v)

	if len(words) == 0 {
		return nil
	}

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
		return nil
	}

	// check to see if we are done
	if len(h) == (wordLen - 1) {
		return append(h, n[0])
	}

	sg, sgCtx := sgroup.WithContext(ctx)

	for _, next := range n {
		vl := make([]string, wordLen)
		// we have a potential next row. add the letters to
		// the down lists so we can keep track of the prefix
		for i, l := range strings.Split(next, "") {
			vl[i] = v[i] + l
		}
		hl := append(h, next)
		sg.Go(func() interface{} { return Build(sgCtx, wordLen, hl, vl, words) })
		// nl := searchRemove(words, next))
		// if len(nl) > 0 {
		// 	sg.Go(func() interface{} { return Build(sgCtx, wordLen, hl, vl, nl) })
		// }
	}

	return sg.Wait()
}

// func remove(list []string, index int) []string {
// 	return append(list[:index], list[index+1:]...)
// }

func searchRemove(list []string, target string) []string {
	n := make([]string, len(list))
	for i, l := range list {
		if l == target {
			if i == len(list) {
				list = list[:i-1]
			} else {
				list = append(list[:i], list[i+1:]...)
			}
			copy(n, list)
			return n
		}
	}
	copy(n, list)
	return n
}

// go func(next string) {
// 	vl := make([]string, wordLen)
// 	// we have a potential next row. add the letters to
// 	// the down lists so we can keep track of the prefix
// 	for i, l := range strings.Split(next, "") {
// 		vl[i] = v[i] + l
// 	}
// 	hl := append(h, next)
// 	xword, err := Build(wordLen, hl, vl, searchRemove(words, next))
// 	if err != nil {
// 		// fmt.Println("failed to build xword")
// 	}
// 	select {
// 	case ch <- xword:
// 		fmt.Println("manager : sent signal", xword)
// 	default:
// 		fmt.Println("manager : dropped data")
// 	}
// }(next)

// emps := len(n)
// ch := make(chan []string, emps)

// for emps > 0 {
// 	p := <-ch
// 	emps--
// 	if len(p) == wordLen {
// 		fmt.Println(p)
// 		close(ch)
// 		return p, nil
// 	}
// }
