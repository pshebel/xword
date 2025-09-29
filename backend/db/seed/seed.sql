-- bug
-- uno
-- bot

INSERT INTO words (id, word, clue) VALUES
(1, 'bug', 'lives in code'),
(2, 'bot', 'twitter user'),
(3, 'got', 'Sean Bean dies'),
(4, 'uno', 'shitty card game'),
(5, 'bub', 'rude greating'),
(6, 'uno', 'lowest tier pizza place'),
(7, 'tames', 'makes less wild'),
(8, 'image', 'visual representation'),
(9, 'tinge', 'a faint hint'),
(10, 'enter', 'go in'),
(11, 'rears', 'multiple hindquarters'),
(12, 'titer', 'lab dilution result'),
(13, 'amine', 'Nitrogen-containing organic base'),
(14, 'manta', 'large ray'),
(15, 'egger', 'someone who supplies fowl products'),
(16, 'seers', 'they saw it coming'),
(17,'taker', 'One who’s not a giver.'),
(18, 'agave', 'Plant that’s always up for a shot.' ),
(19, 'files', 'pile up'),
(20, 'flint', 'Stone that really sparks.'),
(21, 'yeats', 'Poet who made words dance to a Celtic beat.'),
(22, 'taffy', 'Pulls no punches—just sugar.'),
(23, 'agile', 'Quick on its feet, not fragile.'),
(24, 'kalia', 'of the Vast'),
(25, 'event', 'Something worth noting'),
(26, 'rests', 'Takes a break, musically or otherwise.');

INSERT INTO puzzles (id, size, hash) VALUES 
(2, 5, 'dGFtZXNpbWFnZXRpbmdlZW50ZXJyZWFycw==');

INSERT INTO puzzle_words (puzzle_id, word_id, across, idx) VALUES
(1, 1, 1, 0),
(1, 2, 1, 2),
(1, 3, 0, 2),
(1, 4, 1, 1),
(1, 5, 0, 0),
(1, 6, 0, 1),
(2, 7, 1, 0),
(2, 8, 1, 1),
(2, 9, 1, 2),
(2, 10, 1, 3),
(2, 11, 1, 4),
(2, 12, 0, 0),
(2, 13, 0, 1),
(2, 14, 0, 2),
(2, 15, 0, 3),
(2, 16, 0, 4),
(3, 17, 1, 0),
(3, 18, 1, 1),
(3, 19, 1, 2),
(3, 20, 1, 3),
(3, 21, 1, 4),
(3, 22, 0, 0),
(3, 23, 0, 1),
(3, 24, 0, 2),
(3, 25, 0, 3),
(3, 26, 0, 4);
