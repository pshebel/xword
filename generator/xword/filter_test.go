package xword

import (
	"strings"
	"testing"
)

func TestFilter(t *testing.T) {
	var test = []struct {
		name    string
		prefix  string
		wordLen int
		words   []string
		filter  string
	}{
		{"test filter", "t", 4, []string{"test", "abcd", "t", "te", "tart"}, "test, tart"},
	}

	for _, tc := range test {
		t.Run(tc.name, func(t *testing.T) {
			ans := strings.Join(Filter(tc.prefix, tc.wordLen, tc.words), ", ")
			if ans != tc.filter {
				t.Errorf("filter failed")
			}
		})
	}
}
