package models

type Puzzle struct {
    ID		int `json:"id"`
    Size int `json:"size"`
    Across []Clue `json:"across"`
    Down []Clue `json:"down"`
    Hash string `json:"hash"`
}

type Clue struct {
    ID int `json:"id"`
    Text string `json:"text"`
}
