package generate

import (
  "math/rand"
  "io/ioutil"
	"strconv"
  "strings"
  "errors"
  "time"
  "github.com/pshebel/xword/app/models"
  // "github.com/pshebel/xword/app/util"
)

// initialize xword
func initXword(width int) models.Xword {
  grid := make([][]string, width)
  for i := 0; i < width; i++ {
    row := make([]string, width)
    for j := 0; j < width; j++ {
      row[j] = "-"
    }
    grid[i] = row
  }
  xword := models.Xword{
    Valid: false,
    Width: width,
    Grid: grid,
  }
  return xword
}

func getSeed(width, index int, dbPath string) (string, error) {
  // get a random word to start xword
  alphabet := []string{"a","b","c","d","e","f","g","h","i",
                       "j","k","l","m","n","o","p","q","r",
                       "s","t","u","v","w","x","y","z"}
  start := alphabet[index]
  fname := dbPath+strconv.Itoa(width)+"/"+start
  wordListBin, err := ioutil.ReadFile(fname)
  if err != nil {
    return "", err
  }
  wordList := strings.Split(string(wordListBin), "\n")
  rand.Seed(time.Now().UTC().UnixNano())
  word := wordList[rand.Intn(len(wordList) - 1)]
  return word, nil
}

func getLists(seed string, dbPath string) ([][]string, error) {
  lists := make([][]string, len(seed))
  for i := 0; i < len(seed); i++ {
    // get file that matches name
    fname := dbPath+strconv.Itoa(len(seed))+"/"+string(seed[i])
    wordListBin, err := ioutil.ReadFile(fname)
    if err != nil {
      return lists, err
    }
    wordList := strings.Split(string(wordListBin), "\n")
    lists[i] = wordList
  }
  return lists, nil
}

// index = 1st 2nd, ... or Nth item in the list
// dir = 0: row, 1: col
func update(xword *models.Xword, word string, index int, dir int) {
  for i := 0; i < xword.Width; i++ {
    if dir == 0 {
      xword.Grid[index][i] = string(word[i])
    } else {
      xword.Grid[i][index] = string(word[i])
    }
  }
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

func isValidPrefix(prefix string, width int, dbPath string) (bool, error) {

  fname := dbPath+strconv.Itoa(width)+"/"+string(prefix[0])
  wordListBin, err := ioutil.ReadFile(fname)
  if err != nil {
    return false, err
  }
  wordList := strings.Split(string(wordListBin), "\n")
  for _, word := range wordList {
    // checking for whitespace or garbage
    if len(word) < width {
      continue
    }
    if string(string(word)[0:len(prefix)]) == prefix {
      return true, nil
    }
  }
  return false, nil
}

// prefix
// letters
// width
func addLetter(prefix []string, letters [][]string, width int, index int, dbPath string) string {
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
    isValid, err := isValidPrefix(newPrefixStr, width, dbPath)
    if !isValid || err != nil {
      continue
    }
    // if len(addLetter(newPrefix, letters, width, index, dbPath)) == width {
    //   return newPrefixStr
    // }
    return addLetter(newPrefix, letters, width, index, dbPath)
  }

  return ""
}

func buildWord(letters [][]string, width int, index int, dbPath string) (string, error) {
  // aye there's the rub
  // To solve it we must build tree, which means recursion
  prefix := make([]string, 0)
  word := addLetter(prefix, letters, width, index, dbPath)
  if word != "" {
    return word, nil
  }
  return "", errors.New("could not build word")
}

func getNextWord(lists [][]string, width int, index int, dbPath string) (string, [][]string, error) {
  // lists is a initially a list of lists for all words that match the seed word
  // for example if the seed word is test, the list would look like
  // [["tail", "taxi", ...],
  // ["expo", "eyes", ...],
  // ["snot", "smug", ...],
  // ["tusk", "tuna", ...],]
  // 1) we need to turn this into a list of letters that are available for the next
  // word across
  letters := getListsOfLetters(lists, width, index)
  // [[a i r ... ] [x y d ... ] [n m i ... ] [a i r ... ]]
  // 2) build a word from these lists
  // "axis"
  // we now have a xword that looks like
  // [[t e s t]
  //  [a x i s]
  //  [- - - -]
  //  [- - - -]]
  word, _ := buildWord(letters, width, index, dbPath)
  // if err != nil {
  //   return "", err
  // }

  // 3) filter the original lists to match the new grid
  // [["talk", "task", ...],
  //  ["expo", "exit", ...],
  //  ["size", "sits", ...],
  //  ["tsks", "tsar", ...],]
  newList := filterList(word, lists, index)
  // 4) return both the word and the new lists

  return word, newList, nil
}

// width: size of puzzle, dbPath: path to testdata
func Generate(width int, dbPath string) (*models.Xword, error) {
  xword := initXword(width)
  rand.Seed(time.Now().UTC().UnixNano())

  seed, err := getSeed(width, rand.Intn(25), dbPath)
  if err != nil {
    return nil, err
  }

  lists, err := getLists(seed, dbPath)
  if err != nil {
    return nil, err
  }
  update(&xword, seed, 0, 0)
  count := 1
  for count != width {
    word, newLists, err := getNextWord(lists, width, count, dbPath)

    if err != nil {
      return &models.Xword{Valid: false}, err
    }
    if len(word) != width {
      return &models.Xword{Valid: false}, errors.New("could not build xword")
    }
    lists = newLists
    update(&xword, word, count, 0)
    count += 1
  }
  xword.Valid = true
  xword.Width = width
  return &xword, nil
}
