ALTER TABLE users
ADD COLUMN provider_id bigserial REFERENCES providers(id);
