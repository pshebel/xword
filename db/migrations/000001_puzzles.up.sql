CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS puzzles (
    id INTEGER PRIMARY KEY,
    size INTEGER NOT NULL,
    cert TEXT,
    CONSTRAINT unique_cert UNIQUE (cert)
);

CREATE TABLE IF NOT EXISTS padded_words (
    id INTEGER PRIMARY KEY,
    word_id INTEGER NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS puzzle_words (
    id INTEGER PRIMARY KEY,
    puzzle_id INTEGER NOT NULL,
    padded_word_id INTEGER NOT NULL,
    across BOOLEAN NOT NULL,
    clue TEXT NOT NULL,
    idx INTEGER NOT NULL,
    FOREIGN KEY (puzzle_id) REFERENCES puzzles(id) ON DELETE CASCADE,
    FOREIGN KEY (padded_word_id) REFERENCES padded_words(id) ON DELETE CASCADE
);
