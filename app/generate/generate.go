package generate

import (
  "github.com/pshebel/xword/app/models"
)

// index = 1st 2nd, ... or Nth item in the list
// dir = 0: row, 1: col

func getSeed() string, int, int {
  // get a random word to start xword
}

func init(seed string, index int, dir int) models.Xword {
  // initialize xword
}

func score(xword) models.ScoreTable {
  // score xword
}

func Generate() models.xword {
  seed := getSeed()
  xword := init(seed)
  for 1 {
    score := score(xword)
    pick, index, dir := pickWord(score, xword)
    xword = update(pick, index, dir, xword)
  }
  return xword
}
