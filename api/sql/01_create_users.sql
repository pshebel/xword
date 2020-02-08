CREATE USER 'xword_writer'@'%' IDENTIFIED BY 'xword_writer_passowrd';

-- GRANT USAGE ON *.* TO 'xword_writer'@localhost IDENTIFIED BY 'xword_writer_passowrd';
-- GRANT CREATE, INSERT, UPDATE, DELETE, SELECT, DROP, TRIGGER ON xword.* TO 'xword_writer'@'%';
GRANT ALL PRIVILEGES ON *.* TO 'xword_writer'@'%'
FLUSH PRIVILEGES;