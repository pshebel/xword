package util

import (
  "testing"
  "fmt"
  "github.com/pshebel/xword/app/models"
)

var (
  goldenTest00 = models.Xword {
    Valid: false,
    Width: 4,
    Grid: [][]string{
      {"q","u","o","p"},
      {"u","v","a","s"},
      {"o","a","t","s"},
      {"p","s","s","t"},
    },
  }
  goldenOut00 = [][]string{{"quop", "uvas", "oats", "psst"}, {"quop", "uvas", "oats", "psst"},}
)

func TestGetRC(t *testing.T) {
  cases := map[string]struct {
    args models.Xword
    output [][]string
  }{
    "valid xword": {
      goldenTest00,
      goldenOut00,
    },
  }
  for name, tx := range cases {
		t.Run(name, func(t *testing.T) {
      out := GetRC(tx.args)
      fmt.Println(out)
      fmt.Println(tx.output)
      // if xwordStr != tx.output {
      //   t.Errorf("expected %q, got %q", tx.output, xwordStr )
      // }
		})
	}
}
