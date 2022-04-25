CREATE EXTENSION unaccent;

CREATE TABLE words (
    ortografia TEXT,
    freq_orto TEXT,
    nb_letras TEXT
);

COPY words FROM '/words.csv' DELIMITER ',' CSV HEADER;
