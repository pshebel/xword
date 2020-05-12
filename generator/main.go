package main

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/pshebel/xword/api/models"
	"github.com/pshebel/xword/generator/xword"
)

var (
	url = os.Getenv("XWORD_API")
)

func main() {
	wordLen := 5
	wordMap, wordList, err := read(int64(wordLen))
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	for i := range wordList {
		seed := wordList[i]
		h := []string{seed}
		v := strings.Split(seed, "")
		ctx := context.TODO()
		words := xword.Build(ctx, wordLen, h, v, wordList)
		if words != nil {
			xword := format(int64(wordLen), words.([][]string), wordList, wordMap)
			if xword == nil {
				//
				continue
			}
			err := write(*xword)
			if err != nil {
				// fmt.Println(err)
				// return
			} else {
				fmt.Println(words)
			}
		}
	}
	return
}

// func main() {
// 	seed := os.Args[1]
// 	wordLen := 4
// 	_, wordList, err := read(int64(wordLen))
// 	if err != nil {
// 		fmt.Println(err.Error())
// 		return
// 	}
// 	h := []string{seed}
// 	v := strings.Split(seed, "")
// 	wordList = xword.SearchRemove(wordList, seed)
// 	ctx := context.TODO()
// 	xword := xword.Build(ctx, 4, h, v, wordList)
// 	if xword == nil {
// 		fmt.Println("err, no xword found")
// 		return
// 	}
// 	// if words != nil {
// 	// 	xword := format(int64(wordLen), words.([][]string), wordList, wordMap)
// 	// 	err := write(xword)
// 	// 	if err != nil {
// 	// 		fmt.Println(err)
// 	// 		return
// 	// 	}
// 	// }
// 	fmt.Println("xword", xword)
// 	return
// }

func read(wordLen int64) (map[string][]int64, []string, error) {
	resp, err := http.Get(url + "/api/words?length=" + strconv.Itoa(int(wordLen)))
	if err != nil {
		return nil, nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, nil, err
	}

	var w models.Words
	err = json.Unmarshal(body, &w)
	if err != nil {
		return nil, nil, err
	}

	wordMap := make(map[string][]int64)
	var words []string

	for _, word := range w {
		ids := wordMap[*word.Word]
		if ids != nil {
			wordMap[*word.Word] = append(ids, word.ID)
		} else {
			wordMap[*word.Word] = []int64{word.ID}
		}
		words = append(words, *word.Word)
	}

	return wordMap, words, nil
}

func format(wordLen int64, words [][]string, wordList []string, wordMap map[string][]int64) *models.Xword {
	xword := models.Xword{Size: &wordLen}
	// so their are no duplicate definitions
	ids := make([]int64, 2*wordLen)
	// dir
	across := int64(0)
	down := int64(1)

	// across
	h := words[0]
	for i, word := range h {
		var wordID int64
		for _, id := range wordMap[word] {
			if !in(id, ids) {
				wordID = id
				ids = append(ids, id)
				break
			}
		}
		// not enough ids, meaning their is a duplicate
		// word
		if wordID == 0 {
			return nil
		}

		idx := int64(i)
		xw := models.XwordWord{
			WordID: &wordID,
			Idx:    &idx,
			Dir:    &across,
		}
		xword.Words = append(xword.Words, &xw)
	}

	// down
	v := words[1]
	for i, word := range v {
		var wordID int64
		for _, id := range wordMap[word] {
			if !in(id, ids) {
				wordID = id
				ids = append(ids, id)
				break
			}
		}

		// not enough ids, meaning their is a duplicate
		// word
		if wordID == 0 {
			return nil
		}

		idx := int64(i)
		xw := models.XwordWord{
			WordID: &wordID,
			Idx:    &idx,
			Dir:    &down,
		}
		xword.Words = append(xword.Words, &xw)
	}
	// fmt.Println(words, xword)
	return &xword
}

func in(target int64, list []int64) bool {
	for _, ele := range list {
		if ele == target {
			return true
		}
	}
	return false
}

func write(xword models.Xword) error {
	// writing xword
	body, err := json.Marshal(xword)
	if err != nil {
		return err
	}

	req, err := http.NewRequest("POST", url+"/api/xword", bytes.NewBuffer(body))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := ioutil.ReadAll(resp.Body)
		// fmt.Println("response Body:", string(body))
		return errors.New(string(body))
	}

	return nil
}

// func read(wordLen int64) (models.Words, error) {
// 	resp, err := http.Get(url + "/api/words?length=" + strconv.Itoa(int(wordLen)))
// 	if err != nil {
// 		return models.Words{}, err
// 	}
// 	defer resp.Body.Close()
// 	body, err := ioutil.ReadAll(resp.Body)
// 	if err != nil {
// 		return models.Words{}, err
// 	}

// 	var words models.Words
// 	err = json.Unmarshal(body, &words)
// 	if err != nil {
// 		return words, err
// 	}
// 	return words, nil
// }

// func remove(list []string, index int) []string {
// 	return append(list[:index], list[index+1:]...)
// }

// func searchRemove(list []string, target string) []string {
// 	for i, l := range list {
// 		if l == target {
// 			return append(list[:i], list[i+1:]...)
// 		}
// 	}
// 	return list
// }
