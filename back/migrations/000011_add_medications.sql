-- +goose Up

CREATE TABLE user_medications (
  id bigserial PRIMARY KEY,

  user_id bigint NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),

  rxcui varchar(8) NOT NULL,

  created_at timestamp(0) with time zone NOT NULL DEFAULT NOW()
);

CREATE INDEX ON user_medications (user_id);
