package generate

import (
  "fmt"
  "math/rand"
  // "io/ioutil"
	"strconv"
  "strings"
  "errors"
  "time"
  // am "github.com/pshebel/xword/app/models"
  bm "github.com/pshebel/xword/api/models"
  // "github.com/pshebel/xword/app/util"
)

func filterList(word string, list [][]string, index int) ([][]string) {
  newList := make([][]string, len(word))
  for i := 0; i < len(word); i++ {
    // we'll just set it to the max length it could be
    // since it can only be less than the previous list length
    subList := make([]string, 0)
    letter := string(word[i])
    for j := 0; j <len(list[i]); j++ {
      if len(list[i][j]) < len(word) {
        continue
      }
      if string(list[i][j][index]) == letter {
        subList = append(subList, list[i][j])
      }
    }
    newList[i] = subList
  }
  return newList
}

func getListsOfLetters(lists [][]string, width, index int) ([][]string) {
  letters := make([][]string, width)
  for i := 0; i < width; i++ {
    letter := []string{}
    for j := 0; j < len(lists[i]); j++ {
      if len(lists[i][j]) < width {
        continue
      }

      prefix := string(lists[i][j][index])
      shouldAppend := true
      for _, l := range letter {
        if l == prefix {
          shouldAppend = false
          break
        }
      }
      if shouldAppend {
        letter = append(letter, prefix)
      }
    }
    letters[i] = letter
  }
  return letters
}

func isValidPrefix(prefix string, width int, words []string) bool {
  for _, word := range words {
    // checking for whitespace or garbage
    if len(words) < width {
      continue
    }
    // fmt.Println((*word.Word)[0:len(prefix)])
    if string((word)[0:len(prefix)]) == prefix {
      return true
    }
  }
  return false
}

// prefix
// letters
// width
func addLetter(prefix []string, letters [][]string, width int, index int, words []string) string {
  fmt.Println(prefix)
  currentWidth := len(prefix)
  // base case
  if currentWidth == width {
    word := strings.Join(prefix, "")
    return word
  }

  for i := 0; i < len(letters[currentWidth]); i++ {
    nextLetter := string(letters[currentWidth][i])
    newPrefix := append(prefix, nextLetter)
    newPrefixStr := strings.Join(newPrefix, "")
    isValid := isValidPrefix(newPrefixStr, width, words)
    if !isValid {
      continue
    }
    return addLetter(newPrefix, letters, width, index, words)
  }

  return ""
}

func buildWord(letters [][]string, width int, index int, words []string) (string, error) {
  // aye there's the rub
  // To solve it we must build tree, which means recursion
  prefix := make([]string, 0)
  word := addLetter(prefix, letters, width, index, words)
  if word != "" {
    return word, nil
  }
  return "", errors.New("could not build word")
}

func getNextWord(lists [][]string, width int, index int, words []string) (string, [][]string, error) {
  // lists is a initially a list of lists for all words that match the seed word
  // for example if the seed word is test, the list would look like
  // [["tail", "taxi", ...],
  // ["expo", "eyes", ...],
  // ["snot", "smug", ...],
  // ["tusk", "tuna", ...],]
  // 1) we need to turn this into a list of letters that are available for the next
  // word across
  letters := getListsOfLetters(lists, width, index)
  fmt.Println(letters)
  // [[a i r ... ] [x y d ... ] [n m i ... ] [a i r ... ]]
  // 2) build a word from these lists
  // "axis"
  // we now have a xword that looks like
  // [[t e s t]
  //  [a x i s]
  //  [- - - -]
  //  [- - - -]]
  word, _ := buildWord(letters, width, index, words)
  // 3) filter the original lists to match the new grid
  // [["talk", "task", ...],
  //  ["expo", "exit", ...],
  //  ["size", "sits", ...],
  //  ["tsks", "tsar", ...],]
  newList := filterList(word, lists, index)
  // 4) return both the word and the new lists

  return word, newList, nil
}

func getLists(seed string, words []string) [][]string {
  lists := make([][]string, len(seed))
  for i := 0; i < len(words); i++ {
    word := words[i]
    for j := 0; j < len(seed); j++ {
      if word[0] == seed[j] && word != seed {
        lists[j] = append(lists[j], word)
      }
    }
  }

  return lists
}

func getCols(rows []string) []string {
  cols := make([]string, len(rows))
  for _, row := range rows {
    for j := 0; j < len(rows); j++ {
      cols[j] += string(row[j])
    }
  }
  return cols
}

func getDefs(rows []string, cols []string, words []*bm.Word) []string {
  defs := make([]string, 2*len(rows))
  for _, word := range words {
    for i := 0; i < len(rows); i++ {
      if rows[i] == *word.Word {
        def := strconv.Itoa(i)+" Across: "+*word.Definition
        defs[i] = def
      }
      if cols[i] == *word.Word {
        def := strconv.Itoa(i)+" Down: "+*word.Definition
        defs[i+len(rows)] = def
      }
    }
  }
  return defs
}

// width: size of puzzle, dbPath: path to testdata
func Generate(width int, words []*bm.Word) (*[]string, *[]string, error) {
  rows := make([]string, width)
  rand.Seed(time.Now().UTC().UnixNano())
  rand.Shuffle(len(words), func(i, j int) {
    words[i], words[j] = words[j], words[i]
  })

  strWords := make([]string, len(words))
  for i := 0; i < len(words); i++ {
    strWords[i] = *words[i].Word
  }
  fmt.Println(strWords)

  seed := strWords[rand.Intn(len(words))]
  // seed := "bug"
  fmt.Println(seed)
  rows[0] = seed
  lists := getLists(seed, strWords)

  count := 1
  for count != width {
    word, newLists, err := getNextWord(lists, width, count, strWords)
    if err != nil {
      return nil, nil, err
    }

    fmt.Println(word)

    if len(word) != width {
      return nil, nil, errors.New("could not build xword")
    }

    lists = newLists
    rows[count] = word
    count += 1
  }

  cols := getCols(rows)
  defs := getDefs(rows, cols, words)
  return &rows, &defs, nil
}
