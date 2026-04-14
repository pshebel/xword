package models

type Puzzle struct {
	ID		int		`json:"id"`
	Cert	string	`json:"cert"`
	Size	int		`json:"size"`
	Words	[]Word	`json:"words"`
	Block	[]int	`json:"block"`
}

type Word struct {
	ID		int		`json:"id"`
	Across	bool	`json:"across"`
	Index	int		`json:"index"`
	Clue	string	`json:"clue"`
}
