package main

import (
  "fmt"
  "os"
  "strconv"
  "github.com/pshebel/xword/app/models"
  "github.com/pshebel/xword/app/util"
  "github.com/pshebel/xword/app/generateBruteForce"
)

func main() {
  var width int
  if len(os.Args) > 1 {
    width, _ = strconv.Atoi(os.Args[1])
  } else {
    width = 3
  }

  dbPath := "./testdata/"
  xword := &models.Xword{}
  for !(*xword).Valid {
    xword, _ = generateBruteForce.Generate(width, dbPath)
  }

  xwordStr := util.PrintXword(*xword)
  rc := util.GetRC(*xword)
  fmt.Println(xwordStr)
  for i := 0; i < width; i++ {
    fmt.Println("Across "+strconv.Itoa(i)+" : "+rc[0][i]+"\t Down "+strconv.Itoa(i)+" : "+rc[1][i])
  }
}
