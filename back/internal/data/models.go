package data

import (
	"database/sql"
	"errors"
)

var (
	ErrRecordNotFound = errors.New("record not found")
	ErrEditConflict   = errors.New("edit Create")
)

type Models struct {
	Users       UserModel
	Tokens      TokenModel
	Permissions PermissionModel
	Providers   ProviderModel
}

func NewModels(db *sql.DB) Models {
	return Models{
		Tokens:      TokenModel{DB: db},
		Users:       UserModel{DB: db},
		Permissions: PermissionModel{DB: db},
		Providers:   ProviderModel{DB: db},
	}
}
