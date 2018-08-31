package main

import (
  "fmt"
  // "time"
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
  url = "http://localhost:3000/api"
)

func getWord(length string) (*bm.Words, error) {
  requestUrl := url + "/word?length=" + length
  req, err := http.NewRequest("GET", requestUrl, nil)
	if err != nil {
    return nil, err
	}

  client := &http.Client{}

  resp, err := client.Do(req)
  if err != nil {
    return nil, err
  }

  defer resp.Body.Close()

  var words bm.Words

  if err := json.NewDecoder(resp.Body).Decode(&words); err != nil {
    return nil, err
  }
  return &words, nil
}

func postXword(words []string, definitions []string) (*bm.ReturnCode, error) {
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

  client := &http.Client{}

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
  // for start := time.Now(); time.Since(start) < time.Minute; {
  //     words, err := getWord("3")
  //     if err != nil {
  //       fmt.Println(err)
  //       break
  //     }
  //     xword, defs, err := generate.Generate(3, *words)
  //     if err == nil {
  //       _, err := postXword(*xword, *defs)
  //       if err != nil {
  //         fmt.Println(err)
  //         break
  //       }
  //     } else {
  //       fmt.Println(err)
  //       break
  //     }
  // }
  words, err := getWord("3")
  if err != nil {
    fmt.Println(err)
  } else {
    fmt.Println(words)
  }
  xword, defs, _ := generate.Generate(3, *words)
  if err == nil {
    _, err := postXword(*xword, *defs)
    if err != nil {
      fmt.Println(err)
    }
  } else {
    fmt.Println(err)
  }
  fmt.Println(xword, defs)

  return
}
