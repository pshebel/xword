package models

type Puzzle struct {
	ID	string	`json:"id"`
	Cert	string	`json:"cert"`
	Words	[]Word	`json:"words"`
	Block	[]int	`json:"block"`
}

type Word struct {
	ID	string	`json:"id"`
	Across	bool	`json:"across"`
	Index	string	`json:"index"`
	Clue	string	`json:"text"`
}
