package generate

import (
  "testing"
  "strings"
  "strconv"
  // "fmt"
  bm "github.com/pshebel/xword/be/models"
  // "github.com/pshebel/xword/app/util"
)

var (
  bot = "bot"
  bub = "bub"
  uno = "uno"
  got = "got"
  goldenWords = []*bm.Word {
    &bm.Word{ Word: &bot, Definition: &bot},
    &bm.Word{ Word: &bub, Definition: &bub},
    &bm.Word{ Word: &uno, Definition: &uno},
    &bm.Word{ Word: &got, Definition: &got},
  }
  goldenLists = [][]string{{"bot", "bub"}, {"uno"}, {"got"},}
  // goldenThreeZero = "a--"
  // goldenFourOne = "b---"
  // goldenInitFour = models.Xword{
  //   Valid: false,
  //   Width: 4,
  //   Grid: [][]string{
  //     {"-","-","-","-"},
  //     {"-","-","-","-"},
  //     {"-","-","-","-"},
  //     {"-","-","-","-"},
  //   },
  // }
  // goldenTest00 = models.Xword {
  //   Valid: false,
  //   Width: 4,
  //   Grid: [][]string{
  //     {"t","e","s","t"},
  //     {"-","-","-","-"},
  //     {"-","-","-","-"},
  //     {"-","-","-","-"},
  //   },
  // }
  // goldenLists = [][]string{{"tail", "taxi", "tink", "tine", "tree"},
  //                          {"expo", "eyes", "edgy", "echo", "earn"},
  //                          {"snot", "smug", "sink", "sill", "shut"},
  //                          {"tsks", "tuna", "trim", "town", "toss"},
  //                        }
  // goldenLetters = [][]string{{"a", "i", "r"},
  //                            {"x", "y", "d","c","a"},
  //                            {"n", "m", "i", "h"},
  //                            {"s", "u", "r", "o"},
  //                           }
)

func TestGetLists(t *testing.T) {
  cases := map[string]struct {
    seed string
    output [][]string
  }{
    "seed: test": {"test", goldenLists},
  }
  for name, tx := range cases {
    t.Run(name, func(t *testing.T) {
      lists := getLists("bug", goldenWords)
      l := strings.Join([]string{strings.Join(lists[0], ", "), strings.Join(lists[1], ", "), strings.Join(lists[2], ", ")}, " | ")
      o := strings.Join([]string{strings.Join(tx.output[0], ", "), strings.Join(tx.output[1], ", "), strings.Join(tx.output[2], ", ")}, " | ")
      if l != o {
        t.Errorf("expected %q, got %q", o, l)
      }
    })
  }
}

func TestIsValidPefix(t *testing.T) {
  cases := map[string]struct {
    prefix string
    width int
    words []*bm.Word
    output bool
  }{
    "valid": {"bu", 3, goldenWords, true},
    "invalid": {"xx", 3, goldenWords, false},
  }
  for name, tx := range cases {
    t.Run(name, func(t *testing.T) {
      r := isValidPrefix(tx.prefix, tx.width, tx.words)
      if r != tx.output {
        t.Errorf("expected %q, got %q", strconv.FormatBool(tx.output), strconv.FormatBool(r))
      }
    })
  }
}

func TestGetCols(t *testing.T) {
  cases := map[string]struct {
    rows []string
    output []string
  }{
    "rows to cols": {
      []string{"bug", "uno", "bot"},
      []string{"bub", "uno", "got"},
    },
  }
  for name, tx := range cases {
    t.Run(name, func(t *testing.T) {
      cols := getCols(tx.rows)
      c := strings.Join(cols, " ")
      o := strings.Join(tx.output, " ")
      if c != o {
        t.Errorf("expected %q, got %q", o, c)
      }
    })
  }
}

// func TestGetSeed(t *testing.T) {
//   cases := map[string]struct {
//     width   int
//     index   int
//     output  string
//   }{
//     "width: three, index: 0": { 3,  0, goldenThreeZero},
//     "width: four, index: 1": { 4, 1, goldenFourOne},
//   }
//   for name, tx := range cases {
//     t.Run(name, func(t *testing.T) {
//       word, _ := getSeed(tx.width, tx.index, "../../testdata/")
//
//       if word[0] != tx.output[0] || len(word) != len(tx.output) {
//         t.Errorf("expected %q, got %q", tx.output, word )
//       }
//     })
//   }
// }
//
// func TestInitXWord(t *testing.T) {
//   cases := map[string]struct {
//     width int
//     output string
//   }{
//     "width: 4": {4, util.PrintXword(goldenInitFour)},
//   }
//   for name, tx := range cases {
//     t.Run(name, func(t *testing.T) {
//       xword := initXword(tx.width)
//       if util.PrintXword(xword) != tx.output {
//         t.Errorf("expected %q, got %q", tx.output, util.PrintXword(xword))
//       }
//     })
//   }
// }
//
// func TestUpdate(t *testing.T) {
//   cases := map[string]struct {
//     xword models.Xword
//     word string
//     index int
//     dir int
//     output string
//   }{
//     "insert test": {goldenInitFour, "test", 0, 0, util.PrintXword(goldenTest00)},
//   }
//   for name, tx := range cases {
//     t.Run(name, func(t *testing.T) {
//       update(&tx.xword, tx.word, tx.index, tx.dir)
//       if util.PrintXword(tx.xword) != tx.output {
//         t.Errorf("expected %q, got %q", tx.output, util.PrintXword(tx.xword))
//       }
//     })
//   }
// }
//

//
// func TestAddLetter(t *testing.T) {
//   cases := map[string]struct {
//     prefix []string
//     letters [][]string
//     width int
//     index int
//     dbPath string
//     output string
//   }{
//     "addLetter": {make([]string, 0), goldenLetters, 4, 1, "../../testdata/", "axis"},
//   }
//   for name, tx := range cases {
//     t.Run(name, func(t *testing.T) {
//       w := addLetter(tx.prefix, tx.letters, tx.width, tx.index, tx.dbPath)
//       if w != tx.output {
//         t.Errorf("expected %q, got %q", tx.output, w)
//       }
//     })
//   }
// }
//
// func TestGetNextWord(t *testing.T) {
//   cases := map[string]struct {
//     lists [][]string
//     width int
//     index int
//     dbPath string
//     output string
//   }{
//     "generate": {goldenLists, 4, 1, "../../testdata/", "axis"},
//   }
//   for name, tx := range cases {
//     t.Run(name, func(t *testing.T) {
//       w, _, _ := getNextWord(tx.lists, tx.width, tx.index, tx.dbPath)
//       if w != tx.output {
//         t.Errorf("expected %q, got %q", tx.output, w)
//       }
//     })
//   }
// }

// func TestFilterList(t *testing.T){
//   cases := map[string]struct {
//     word string
//     list [][]string
//     index int
//     output [][]string
//   }{
//     "generate": {"axis", goldenLists, 1, goldenLists},
//   }
//   for name, tx := range cases {
//     t.Run(name, func(t *testing.T) {
//       w := filterList(tx.word, tx.list, tx.index)
//       fmt.Print(w)
//       // wStr := strings.Join(strings.Join(w, ","), "\n")
//       // oStr := strings.Join(strings.Join(tx.output, ","), "\n")
//       // if wStr != oStr {
//       //   t.Errorf("expected %q, got %q", oStr, wStr)
//       // }
//     })
//   }
// }

// func TestGenerate(t *testing.T) {
//   cases := map[string]struct {
//     width int
//     output string
//   }{
//     "generate": {4, util.PrintXword(goldenTest00)},
//   }
//   for name, tx := range cases {
//     t.Run(name, func(t *testing.T) {
//       xword, _ := Generate(tx.width, "../../testdata/")
//       if util.PrintXword(*xword) != tx.output {
//         t.Errorf("expected %q, got %q", tx.output, util.PrintXword(*xword))
//       }
//     })
//   }
// }
