-- bug
-- uno
-- bot

INSERT INTO words (id, word, clue) VALUES
(1, "bug", "lives in code"),
(2, "bot", "twitter user"),
(3, "got", "Sean Bean dies"),
(4, "uno", "shitty card game"),
(5, "bub", "rude greating"),
(6, "uno", "lowest tier pizza place");

INSERT INTO puzzles (id) VALUES (1);

INSERT INTO puzzle_words (puzzle_id, word_id, across, pw_index) VALUES
(1, 1, 1, 0),
(1, 2, 1, 2),
(1, 3, 0, 2),
(1, 4, 1, 1),
(1, 5, 0, 2),
(1, 6, 0, 1);