-- +goose Up

ALTER TABLE users

ADD COLUMN provider_id BIGINT REFERENCES providers(id) ON DELETE SET NULL;

-- +goose Down

ALTER TABLE users
DROP COLUMN provider_id;
