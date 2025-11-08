-- bug
-- uno
-- bot

INSERT INTO puzzles (id, size) VALUES 
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", 5),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", 5);

INSERT INTO words (id, text) VALUES
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a00", "zooms"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a01", "arson"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a02", "prada"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a03", "**ker"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a04", "**asl"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a05", "zap**"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a06", "orr**"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a07", "osaka"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a08", "modes"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a09", "snarl"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a10", "**ase"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98a11", "snare");

INSERT INTO clues (id, word_id, text) VALUES
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a00", "Speeds up rapidly"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a01", "Set fire to intentionally"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b02", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a02", "Luxury fashion brand"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b03", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a03", "Sound a goat makes"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b04", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a04", "Sign language abbreviation"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b05", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a05", "Electric shock or sudden burst"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b06", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a06", "Irish mythical creature"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b07", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a07", "City in Japan famous for food"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b08", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a08", "styles or fashions"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b09", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a09", "Growls with displeasure"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b10", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a10", "Abbreviation for art student"),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98b11", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a11", "Trap or catch unawares");


INSERT INTO puzzle_words (puzzle_id, word_id, across, idx) VALUES 
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a00", 1, 0),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a01", 1, 1),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a02", 1, 2),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a03", 1, 3),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a04", 1, 4),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a05", 0, 0),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a06", 0, 1),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a07", 0, 2),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a08", 0, 3),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c00", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a09", 0, 4),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a00", 1, 0),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a01", 1, 1),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a02", 1, 2),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a03", 1, 3),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a10", 1, 4),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a05", 0, 0),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a06", 0, 1),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a07", 0, 2),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a08", 0, 3),
("9f46ddbb-0eb3-4f6e-93b6-cffd24d98c01", "9f46ddbb-0eb3-4f6e-93b6-cffd24d98a11", 0, 4);