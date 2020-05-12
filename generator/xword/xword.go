package xword

import (
	"context"

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
	n := BuildWords(m, words)
	if len(n) == 0 {
		return nil
	}

	// check to see if we are done
	if len(h) == (wordLen - 1) {
		for i := 0; i < wordLen; i++ {
			v[i] = v[i] + string(n[0][i])
		}
		return [][]string{append(h, n[0]), v}
	}

	sg, sgCtx := sgroup.WithContext(ctx)

	for _, next := range n {
		vl := make([]string, wordLen)
		// we have a potential next row. add the letters to
		// the down lists so we can keep track of the prefix
		for i := 0; i < wordLen; i++ {
			vl[i] = v[i] + string(next[i])
		}
		hl := append(h, next)
		sg.Go(func() interface{} { return Build(sgCtx, wordLen, hl, vl, words) })
		// nl := SearchRemove(words, next)
		// // fmt.Println(len(nl))
		// if len(nl) > 0 {
		// 	sg.Go(func() interface{} { return Build(sgCtx, wordLen, hl, vl, nl) })
		// }
	}

	return sg.Wait()
}

// func remove(list []string, index int) []string {
// 	return append(list[:index], list[index+1:]...)
// }

// func SearchRemove(list []string, target string) []string {
// 	n := make([]string, len(list))
// 	copy(n, list)

// 	for i, l := range list {
// 		if l == target {
// 			if i == len(list)-1 {
// 				n = n[:i]
// 			} else if i == 0 {
// 				n = n[1:]
// 			} else {
// 				n = append(n[:i], n[i+1:]...)
// 			}
// 			return n
// 		}
// 	}
// 	return list
// }

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
