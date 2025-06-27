package models

type Puzzle struct {
    ID		int `json:"id"`
    Across	string[] `json:"across"`
    Down	string[] `json:"down"`
}

type Check struct {
    ID int `json:"id"`
    Words string[] `json:"words"`
}