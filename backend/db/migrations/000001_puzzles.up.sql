CREATE TABLE IF NOT EXISTS words (
    id INT NOT NULL,
    word TEXT NOT NULL,
    clue TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS puzzles (
    id INT NOT NULL,
    size INT NOT NULL
);

CREATE TABLE IF NOT EXISTS puzzle_words (
    puzzle_id INT NOT NULL,
    word_id INT NOT NULL,
    across BOOL NOT NULL,
    index INT NOT NULL
);