package util

import (
  "strings"
  "github.com/pshebel/xword/app/models"
)

func PrintXword(puzzle models.Xword) string {
  xword := []string{}
  for i := 0; i < puzzle.Width; i++ {
    line := ""
    for j := 0; j < puzzle.Width; j++ {
      line += puzzle.Grid[i][j]
    }
    charArr := strings.Split(line, "")
    spacedString := strings.Join(charArr, " ")
    xword = append(xword, spacedString)
  }
  return strings.Join(xword, "\n")
}
