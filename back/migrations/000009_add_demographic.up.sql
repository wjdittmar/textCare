CREATE TYPE biological_sex AS ENUM (
    'male',
    'female',
    'intersex',
    'unknown'
);

ALTER TABLE users
ADD COLUMN sex_at_birth biological_sex;

ALTER TABLE users
  ADD COLUMN phone_number VARCHAR(20);

ALTER TABLE users
  ADD COLUMN address_line_one VARCHAR(255),
  ADD COLUMN address_line_two VARCHAR(255),
  ADD COLUMN city VARCHAR(100),
  ADD COLUMN state VARCHAR(100),
  ADD COLUMN zip_code VARCHAR(20),

ALTER TABLE users
    ADD COLUMN birthday DATE;

ALTER TABLE users
ADD COLUMN has_completed_onboarding BOOLEAN NOT NULL DEFAULT false;
