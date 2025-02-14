-- +goose Up

CREATE TABLE icd10_frequencies (
  icd10_code VARCHAR(15) PRIMARY KEY,
  frequency BIGINT NOT NULL
);

COPY icd10_frequencies(icd10_code, frequency)
FROM '/seed_data/icd_frequencies.csv'
DELIMITER ','
CSV HEADER;

-- +goose Down
DROP TABLE icd10_frequencies;
