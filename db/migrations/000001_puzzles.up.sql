CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS prompts (
    id INTEGER PRIMARY KEY,
    label TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS puzzles (
    id INTEGER PRIMARY KEY,
    size INTEGER NOT NULL,
    cert TEXT,
    CONSTRAINT unique_cert UNIQUE (cert)
);


CREATE TABLE IF NOT EXISTS padded_words (
    id INTEGER PRIMARY KEY,
    word_id INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS clues (
    id INTEGER PRIMARY KEY,
    word_id INTEGER NOT NULL REFERENCES words(id) ON DELETE CASCADE,
    prompt_id INTEGER NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
    text TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS puzzle_words (
    puzzle_id INTEGER NOT NULL REFERENCES puzzles(id) ON DELETE CASCADE,
    padded_word_id INTEGER NOT NULL REFERENCES padded_words(id) ON DELETE CASCADE,
    across BOOLEAN NOT NULL,
    idx INTEGER NOT NULL,
    PRIMARY KEY (puzzle_id, padded_word_id)
);
