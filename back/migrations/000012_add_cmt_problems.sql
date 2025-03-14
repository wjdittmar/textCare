-- +goose Up

CREATE TABLE user_problems (
    id bigserial PRIMARY KEY,

    user_id bigint NOT NULL,
    CONSTRAINT fk_user
      FOREIGN KEY (user_id) REFERENCES users(id),

    problem_id integer NOT NULL,
    CONSTRAINT fk_problem
      FOREIGN KEY (problem_id) REFERENCES cmt_terminology(id),

    created_at timestamp with time zone NOT NULL DEFAULT NOW(),
    updated_at timestamp with time zone NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_user_problems_user_id ON user_problems (user_id);
