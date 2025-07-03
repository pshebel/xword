package models

type Puzzle struct {
    ID		int `json:"id"`
    Words   []Word `json:"words"`
}

type Word struct {
    ID int `json:"id"`
    Across bool `json:"across"`
    Index int `json:"index"`
    Clue string `json:"clue"`
}

type Check struct {
    ID int `json:"id"`
    Words []string `json:"words"`
}