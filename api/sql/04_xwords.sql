CREATE TABLE xword.xwords (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  hash VARCHAR(500) NOT NULL UNIQUE,
  size INT NOT NULL
);

CREATE TABLE xword.xword_words (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  xword_id INT NOT NULL,
  idx INT NOT NULL,
  dir TINYINT NOT NULL,
  word_id INT NOT NULL,
CONSTRAINT fk_xword_words_id
  FOREIGN KEY (xword_id)
  REFERENCES xwords(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
CONSTRAINT fk_word_id
  FOREIGN KEY (word_id)
  REFERENCES words(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);

-- We want to remove the xword after someone gets it
-- CREATE TABLE xword.xwords_archive (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   xword_id INT NOT NULL,
--   size INT NOT NULL
-- );

-- CREATE TRIGGER xword.xword_archiver AFTER SELECT ON xword.xwords 
