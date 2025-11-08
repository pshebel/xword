CREATE TABLE IF NOT EXISTS words (
    id TEXT NOT NULL,
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clues (
    id TEXT NOT NULL,
    word_id TEXT NOT NULL,
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS puzzles (
    id TEXT NOT NULL,
    size INT NOT NULL
);

CREATE TABLE IF NOT EXISTS puzzle_words (
    puzzle_id TEXT NOT NULL,
    word_id TEXT NOT NULL,
    across BOOL NOT NULL,
    idx INT NOT NULL
);