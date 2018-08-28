package util

import (
  "strings"
  "github.com/pshebel/xword/app/models"
)

func GetRC(puzzle models.Xword) [][]string {
  width := puzzle.Width
  across := make([]string, width)
  down := make([]string, width)
  for i := 0; i < width; i++ {
    a := make([]string, width)
    d := make([]string, width)
    for j := 0; j < width; j++ {
      a[j] = puzzle.Grid[i][j]
      d[j] = puzzle.Grid[j][i]
    }
    across[i] = strings.Join(a, "")
    down[i] = strings.Join(d, "")
  }
  rc := [][]string{across, down}
  return rc
}
