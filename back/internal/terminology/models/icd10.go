package models

import (
	"context"
	"database/sql"
	"time"
)

type Code struct {
	ID          int64     `json:"id"`
	SystemID    int64     `json:"system_id"`
	Code        string    `json:"code"`
	Display     string    `json:"display"`
	Description string    `json:"description,omitempty"`
	CreatedAt   time.Time `json:"created_at"`
}

type TerminologyModel struct {
	DB    *sql.DB
	Cache *RedisCache
}

func (m TerminologyModel) Search(ctx context.Context, system string, query string, limit int) ([]Code, error) {
	// // First try cache
	// if codes, found := m.Cache.Get(system, query); found {
	// 	return codes, nil
	// }

	// If not in cache, query database
	query = `
        SELECT c.id, c.system_id, c.code, c.display, c.description, c.created_at
        FROM terminology_codes c
        JOIN terminology_systems s ON s.id = c.system_id
        WHERE s.name = $1
        AND to_tsvector('english', c.display) @@ plainto_tsquery('english', $2)
        LIMIT $3
    `

	rows, err := m.DB.QueryContext(ctx, query, system, query, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var codes []Code
	// Scan rows into codes...

	// Cache the results
	m.Cache.Set(system, query, codes)

	return codes, nil
}
