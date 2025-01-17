package data

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

type ProviderModel struct {
	DB *sql.DB
}

type Provider struct {
	ID             string    `json:"id"`
	CreatedAt      time.Time `json:"created_at"`
	Name           string    `json:"name"`
	Specialization string    `json:"specialization"`
	Education      string    `json:"education"`
	Description    string    `json:"description"`
	Location       string    `json:"location"`
	UpdatedAt      time.Time `json:"updated_at"`
}

var ErrDuplicateProviderName = errors.New("duplicate provider name")

// Insert adds a new provider record to the database.
func (m ProviderModel) Insert(provider *Provider) error {
	query := `
INSERT INTO providers (name, specialization, education, description, location)
VALUES ($1, $2, $3, $4, $5)
RETURNING created_at, updated_at`
	args := []interface{}{
		provider.Name,
		provider.Specialization,
		provider.Education,
		provider.Description,
		provider.Location,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRowContext(ctx, query, args...).Scan(&provider.CreatedAt, &provider.UpdatedAt)
	if err != nil {
		if err.Error() == `pq: duplicate key value violates unique constraint "providers_name_key"` {
			return ErrDuplicateProviderName
		}
		return err
	}
	return nil
}

func (m ProviderModel) GetByID(id int64) (*Provider, error) {
	query := `
SELECT id, created_at, name, specialization, education, description, location, updated_at
FROM providers
WHERE id = $1`
	var provider Provider

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRowContext(ctx, query, id).Scan(
		&provider.ID, &provider.CreatedAt, &provider.Name, &provider.Specialization,
		&provider.Education, &provider.Description, &provider.Location,
		&provider.UpdatedAt,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrRecordNotFound
		}
		return nil, err
	}
	return &provider, nil
}

func (m ProviderModel) Update(provider *Provider) error {
	query := `
UPDATE providers
SET name = $1, specialization = $2, education = $3, description = $4, location = $5, updated_at = DEFAULT
WHERE id = $6
RETURNING updated_at`
	args := []interface{}{
		provider.Name, provider.Specialization, provider.Education,
		provider.Description, provider.Location, provider.ID,
	}

	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRowContext(ctx, query, args...).Scan(&provider.UpdatedAt)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return ErrEditConflict
		}
		return err
	}
	return nil
}

func (m ProviderModel) GetAll(location string) ([]*Provider, error) {
	// can add additional search params
	query := `
SELECT id, name, specialization, education, description, location FROM providers
WHERE (LOWER(location) = LOWER($1) OR $1 = '')
ORDER BY id`
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	rows, err := m.DB.QueryContext(ctx, query, location)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	providers := []*Provider{}
	for rows.Next() {
		var provider Provider
		err := rows.Scan(
			&provider.ID,
			&provider.Name, &provider.Specialization, &provider.Education, &provider.Description, &provider.Location,
		)
		if err != nil {
			return nil, err
		}
		providers = append(providers, &provider)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	return providers, nil
}
