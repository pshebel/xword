INSERT INTO xword.users (name, words, puzzles) VALUES 
('abc', 0, 0),
('phs', 6, 0);

INSERT INTO xword.words (id, word, word_len, definition, submitter) VALUES
(1, "bug", 3, "lives in code", "phs"),
(2, "bot", 3, "twitter user", "phs"),
(3, "got", 3, "Sean Bean dies", "phs"),
(4, "uno", 3, "shitty card game", "phs"),
(5, "bub", 3, "rude greating", "phs"),
(6, "uno", 3, "lowest tier pizza place", "phs");
-- (7, "rat", 3, "Baltimore mascot"),
-- (8, "ops", 3, "dev, black, etc."),
-- (9, "cry", 3, "Wanna _____"),
-- (10, "orc", 3, "Melkors feeble attempt at creating elves resulted in this"),
-- (11, "par", 3, "the average"),
-- (12, "sty", 3, "Where pigs live, also your bedroom");

INSERT INTO xword.xwords (id, size) VALUES 
(100, 3);

-- bug
-- uno
-- bot
INSERT INTO xword.xword_words(xword_id, idx, dir, word_id) VALUES
(100, 0, 0, 1),
(100, 1, 0, 4),
(100, 2, 0, 2),
(100, 0, 1, 5),
(100, 1, 1, 6),
(100, 2, 1, 3);

