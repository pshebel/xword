package util

import (
  "testing"
  "github.com/pshebel/xword/app/models"
)

var (
  grid = [][]string{{"b","u","g"}, {"u","n","o"}, {"b","o","t"}, }

  testXword = models.Xword{ true, 3, grid, }

  failXword = models.Xword{ false, 1, grid}

  goldenXwordStr = "b u g\nu n o\nb o t"
  goldenFail = "invalid xword"
)

func Test_Xword_Print(t *testing.T) {
  cases := map[string]struct {
    args models.Xword
    output string
  }{
    "valid xword": {
      testXword,
      goldenXwordStr,
    },
  }
  for name, tx := range cases {
		t.Run(name, func(t *testing.T) {
      xwordStr := PrintXword(tx.args)

      if xwordStr != tx.output {
        t.Errorf("expected %q, got %q", tx.output, xwordStr )
      }
		})
	}
}
