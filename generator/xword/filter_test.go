package xword

import "testing"

// func TestFilter(t *testing.T) {
// 	var test = []struct {
// 		name    string
// 		prefix  string
// 		wordLen int
// 		words   []string
// 		filter  string
// 	}{
// 		{"test filter", "t", 4, []string{"test", "abcd", "t", "te", "tart"}, "test, tart"},
// 	}

// 	for _, tc := range test {
// 		t.Run(tc.name, func(t *testing.T) {
// 			ans := strings.Join(Filter(tc.prefix, tc.wordLen, tc.words), ", ")
// 			if ans != tc.filter {
// 				t.Errorf("filter failed")
// 			}
// 		})
// 	}
// }

func BenchmarkFilterWords(b *testing.B) {
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		FilterWords("t", []string{"test", "abcd", "t", "te", "tart"})
	}
}

func BenchmarkGetLetters(b *testing.B) {
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		GetLetters(1, []string{"test", "make", "long", "ball", "tart"})
	}
}

func BenchmarkBuildWords(b *testing.B) {
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		BuildWords([][]string{
			[]string{"t", "m", "l", "a", "b"},
			[]string{"e", "a", "o", "b", "c"},
			[]string{"s", "k", "n", "c", "d"},
			[]string{"t", "e", "g", "d", "e"},
		}, []string{"test", "make", "long", "ball", "tart", "ring"})
	}
}
