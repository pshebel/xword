package models

type Puzzle struct {
    ID		string `json:"id"`
    Size int `json:"size"`
    Block []int `json:"block"`
    Clues []Clue `json:"clues"`
}

type Clue struct {
    Index int `json:"index"`
    Across bool `json:"across"`
    Text string `json:"text"`
}

type CheckRequest struct {
    ID string `json:"id"`
    Words map[int]string `json:"words"`
}

type CheckResponse struct {
    ID string `json:"id"`
    Success bool `json:"success"`
}

