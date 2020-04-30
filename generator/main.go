package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/pshebel/xword/api/models"
	"github.com/pshebel/xword/generator/xword"
)

var (
	url = os.Getenv("XWORD_API")
)

func write(xword models.Xword) error {

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

	if resp.Status != "200" {
		body, _ := ioutil.ReadAll(resp.Body)
		fmt.Println("response Body:", string(body))
		return errors.New(string(body))
	}

	return nil
}

func read(wordLen int64) (models.Words, error) {
	resp, err := http.Get(url + "/api/words?length=" + strconv.Itoa(int(wordLen)))
	if err != nil {
		return models.Words{}, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return models.Words{}, err
	}

	var words models.Words
	err = json.Unmarshal(body, &words)
	if err != nil {
		return words, err
	}
	return words, nil
}

func main() {

	// fmt.Println("Main")

	// allWords := []string{"all", "arc", "alp", "art", "sin", "bot", "bit", "bye", "dot", "dip", "dug", "cat", "bat", "tit", "tat", "rat", "rap", "zit", "got", "uno", "bub", "bud", "bug"}
	// wordLen := 3
	// // words := word.Build(m, allWords)
	for {
		// rand.Seed(time.Now().UTC().UnixNano())
		// wordLen := int64(rand.Intn(5-3) + 3)
		wordLen := int64(3),
		words, err := read(wordLen)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println(words)
		wordID := make(map[string]int64)
		var wordList []string
		for _, word := range words {
			if wordID[*word.Word] != 0 {
				// words are not unique so I randomly replace definitions
				if time.Now().UTC().UnixNano()%2 == 0 {
					wordID[*word.Word] = word.ID
				}
			} else {
				wordID[*word.Word] = word.ID
				wordList = append(wordList, *word.Word)
			}
		}

		wordList, err = xword.Build(int(wordLen), wordList)
		if err != nil {
			fmt.Println(err)
			continue
		}
		// }
		fmt.Println(wordList)
		xword := models.Xword{Size: &wordLen}
		// dir
		across := int64(0)
		down := int64(1)
		for i, w := range wordList {
			// horizontal
			hid := wordID[w]
			idx := int64(i)
			h := models.XwordWord{
				WordID: &hid,
				Idx:    &idx,
				Dir:    &across,
			}
			xword.Words = append(xword.Words, &h)

			// vertical
			w = ""
			for _, v := range wordList {
				list := strings.Split(v, "")
				w += list[i]
			}
			vid := wordID[w]
			v := models.XwordWord{
				WordID: &vid,
				Idx:    &idx,
				Dir:    &down,
			}
			xword.Words = append(xword.Words, &v)
			fmt.Println(*h.WordID, *v.WordID)
		}
		err = write(xword)
		if err != nil {
			fmt.Println(err)
		}
	}
	return
}

func getWords() {
	fmt.Println("getWords")
}

func postXword() {
	fmt.Println("postXword")
}
