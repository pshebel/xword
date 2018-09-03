package main

import (
  "fmt"
  "time"
  "bytes"
  "encoding/json"
  "net/http"
  // "strings"
  // "strconv"
  // app
  // "github.com/pshebel/xword/app/util"
  "github.com/pshebel/xword/app/generate"
  // am "github.com/pshebel/xword/app/models"
  // backend
  // "github.com/pshebel/xword/be/db"
  bm "github.com/pshebel/xword/be/models"
)

var (
  url = "http://localhost:4000/api"
)

func getWord(length string, client *http.Client) (*bm.Words, error) {
  requestUrl := url + "/word?length=" + length
  // requestUrl := url+"/word"
  fmt.Println(requestUrl)
  req, err := http.NewRequest("GET", requestUrl, nil)
	if err != nil {
    return nil, err
	}

  resp, err := client.Do(req)
  if err != nil {
    return nil, err
  }

  defer resp.Body.Close()
  fmt.Println(resp.Body)
  var words bm.Words

  if err := json.NewDecoder(resp.Body).Decode(&words); err != nil {
    return nil, err
  }

  return &words, nil
}

func postXword(words []string, definitions []string, client *http.Client) (*bm.ReturnCode, error) {
  requestUrl := url + "/xword"
  xword := bm.Xword{Words: words, Definitions: definitions}
  x, err := json.Marshal(xword)
  if err != nil {
    return nil, err
  }
  req, err := http.NewRequest("POST", requestUrl, bytes.NewBuffer(x))
  if err != nil {
    return nil, err
  }
  req.Header.Set("Content-Type", "application/json")

  resp, err := client.Do(req)
  if err != nil {
    return nil, err
  }
  defer resp.Body.Close()

  var rc bm.ReturnCode
  if err := json.NewDecoder(resp.Body).Decode(&rc); err != nil {
    return nil, err
  }

  return &rc, nil
}

func main() {
  client := &http.Client{}
  
  words, err := getWord("3", client)
  if err != nil {
    fmt.Println(err)
    return
  } else if len(*words) == 0 {
    fmt.Println("no words found")
    return
  } else {
    fmt.Println(*words)
  }

  for start := time.Now(); time.Since(start) < time.Second; {
      xword, defs, err := generate.Generate(3, *words)
      if err == nil {
        fmt.Println(xword)
        _, err := postXword(*xword, *defs, client)
        if err != nil {
          fmt.Println(err)
        }
      } else {
        fmt.Println(err)
      }
  }

  return
}
