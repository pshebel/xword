package models

type Blog stuct {
    ID		int	`json:"id"`
    Title	string	`json:"title"`
    Article	string	`json:"article"`
}

type BlogSummary struct {
    Titles string[] `json:"titles"`
}