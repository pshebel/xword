
INSERT INTO puzzles (id, size) VALUES 
(0, 5);

INSERT INTO words (id, text) VALUES
(0, 'zooms'),
(1, 'arson'),
(2, 'prada'),
(3, 'ker'),
(4, 'asl'),
(5, 'zap'),
(6, 'orr'),
(7, 'osaka'),
(8, 'modes'),
(9, 'snarl');

INSERT INTO padded_words (id, word_id, text) VALUES 
(0, 0, 'zooms'),
(1,1,'arson'),
(2,2,'prada'),
(3,3,'**ker'),
(4,4,'**asl'),
(5,5,'zap**'),
(6,6,'orr**'),
(7,7,'osaka'),
(8,8,'modes'),
(9,9,'snarl');

INSERT INTO prompts (id, label) VALUES
(0, 'gpt-5-nano low low generic clue');


INSERT INTO clues (id, word_id, prompt_id, text) VALUES
(0,0,0, 'Speeds up rapidly'),
(1,1,0, 'Set fire to intentionally'),
(2,2,0, 'Luxury fashion brand'),
(3,3,0, 'Sound a goat makes'),
(4,4,0, 'Sign language abbreviation'),
(5,5,0, 'Electric shock or sudden burst'),
(6,6,0, 'Irish mythical creature'),
(7,7,0, 'City in Japan famous for food'),
(8,8,0, 'styles or fashions'),
(9,9,0, 'Growls with displeasure');

INSERT INTO puzzle_words (puzzle_id, padded_word_id, across, idx) VALUES 
(0, 0, TRUE, 0),
(0, 1, TRUE, 1),
(0, 2, TRUE, 2),
(0, 3, TRUE, 3),
(0, 4, TRUE, 4),
(0, 5, FALSE, 0),
(0, 6, FALSE, 1),
(0, 7, FALSE, 2),
(0, 8, FALSE, 3),
(0, 9, FALSE, 4);