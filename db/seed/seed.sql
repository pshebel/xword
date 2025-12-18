
INSERT INTO puzzles (id, size, cert) VALUES 
(0, 5, 'zooms,arson,prada,**ker,**asl'),
(1, 5, '*bane,*omar,frost,ter**,cry**');

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
(9, 'snarl'),
(10, 'bane'),
(11, 'omar'),
(12, 'frost'),
(13, 'ter'),
(14, 'cry'),
(15, 'ftc'),
(16, 'borer'),
(17, 'amory'),
(18, 'nas'),
(19, 'ert');

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
(9,9,'snarl'),
(10,10,'*bane'),
(11,11,'*omar'),
(12,12,'frost'),
(13,13,'ter**'),
(14,14,'cry**'),
(15,15,'**ftc'),
(16,16,'borer'),
(17,17,'amory'),
(18,18,'nas**'),
(19,19,'ert**');

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
(9,9,0, 'Growls with displeasure'),
(10,10,0, 'source of ruin'),
(11,11,0, 'Arab given name'),
(12,12,0, 'Thin coating on plants in cold weather'),
(13,13,0, 'Turkish for sweat'),
(14,14,0, 'sound of distress'),
(15,15,0, 'U.S. regulator of advertising and consumer protection'),
(16,16,0, 'insect that tunnels through wood'),
(17,17,0, 'archaic term for love'),
(18,18,0, 'abbr. for National Academy of Sciences'),
(19,19,0, 'Disaster-response team, abbr.');

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
(0, 9, FALSE, 4),
(1, 10, TRUE, 0),
(1, 11, TRUE, 1),
(1, 12, TRUE, 2),
(1, 13, TRUE, 3),
(1, 14, TRUE, 4),
(1, 15, FALSE, 0),
(1, 16, FALSE, 1),
(1, 17, FALSE, 2),
(1, 18, FALSE, 3),
(1, 19, FALSE, 4);