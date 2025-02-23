package data

import (
	"context"
	"crypto/sha256"
	"database/sql"
	"encoding/json"
	"errors"
	"github.com/wjdittmar/textCare/back/internal/validator"
	"golang.org/x/crypto/bcrypt"
	"time"
)

var (
	ErrDuplicateEmail = errors.New("duplicate email")
)
var AnonymousUser = &User{}

func (u User) MarshalJSON() ([]byte, error) {
	type Alias User
	aux := struct {
		Alias
		SexAtBirth     *string `json:"sex_at_birth,omitempty"`
		AddressLineTwo *string `json:"address_line_two,omitempty"`
		Birthday       string  `json:"birthday"`
		ProviderID     *int64  `json:"provider_id,omitempty"`
	}{
		Alias:    Alias(u),
		Birthday: u.Birthday.Format("2006-01-02"),
	}
	if u.SexAtBirth.Valid {
		aux.AddressLineTwo = &u.AddressLineTwo.String
	}
	if u.ProviderID.Valid {
		aux.ProviderID = &u.ProviderID.Int64
	}

	return json.Marshal(aux)
}

type User struct {
	ID         int64          `json:"id"`
	CreatedAt  time.Time      `json:"-"`
	Name       string         `json:"name"`
	Email      string         `json:"email"`
	SexAtBirth sql.NullString `json:"sex_at_birth"`
	Password   password       `json:"-"`
	Version    int            `json:"-"`
	ProviderID sql.NullInt64  `json:"-"`

	AddressLineOne string         `json:"address_line_one"`
	AddressLineTwo sql.NullString `json:"address_line_two"`
	City           string         `json:"city"`
	State          string         `json:"state"`
	ZipCode        string         `json:"zip_code"`

	PhoneNumber string `json:"phone_number"`

	Birthday time.Time `json:"birthday"`

	HasCompletedOnboarding bool `json:"has_completed_onboarding"`
}

type password struct {
	plaintext *string
	hash      []byte
}

func (u *User) IsAnonymous() bool {
	return u == AnonymousUser
}

func (p *password) Set(plaintextPassword string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(plaintextPassword), 12)
	if err != nil {
		return err
	}
	p.plaintext = &plaintextPassword
	p.hash = hash
	return nil
}

func (p *password) Matches(plaintextPassword string) (bool, error) {
	err := bcrypt.CompareHashAndPassword(p.hash, []byte(plaintextPassword))
	if err != nil {
		switch {
		case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
			return false, nil
		default:
			return false, err
		}
	}
	return true, nil
}

func ValidateEmail(v *validator.Validator, email string) {
	v.Check(email != "", "email", "must be provided")
	v.Check(validator.Matches(email, validator.EmailRX), "email", "must be a valid email address")
}

func ValidatePasswordPlaintext(v *validator.Validator, password string) {
	v.Check(password != "", "password", "must be provided")
	v.Check(len(password) >= 8, "password", "must be at least 8 bytes long")
	v.Check(len(password) <= 72, "password", "must not be more than 72 bytes long")
}

func ValidateName(v *validator.Validator, name string) {
	v.Check(name != "", "name", "must be provided")
	v.Check(len(name) <= 500, "name", "must not be more than 500 bytes long")
}

func ValidateRegisterUser(v *validator.Validator, user *User) {
	ValidateName(v, user.Name)
	ValidateEmail(v, user.Email)
	if user.Password.plaintext != nil {
		ValidatePasswordPlaintext(v, *user.Password.plaintext)
	}
	if user.Password.hash == nil {
		panic("missing password hash for user")
	}

}

func ValidateReturnUser(v *validator.Validator, user *User) {
	ValidateName(v, user.Name)
	ValidateEmail(v, user.Email)
}

type UserModel struct {
	DB *sql.DB
}

func (u UserModel) Insert(user *User) error {
	query := `INSERT INTO users (name, email, password_hash, address_line_one, address_line_two, city, state, zip_code, phone_number, birthday, sex_at_birth) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
RETURNING id, created_at, version`
	args := []interface{}{user.Name, user.Email, user.Password.hash, user.AddressLineOne, user.AddressLineTwo, user.City, user.State, user.ZipCode, user.PhoneNumber, user.Birthday, user.SexAtBirth}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	err := u.DB.QueryRowContext(ctx, query, args...).Scan(&user.ID, &user.CreatedAt, &user.Version)
	if err != nil {
		switch {
		case err.Error() == `pq: duplicate key value violates unique constraint "users_email_key"`:
			return ErrDuplicateEmail
		default:
			return err
		}
	}
	return nil
}

func (m UserModel) GetByEmail(email string) (*User, error) {
	query := `
SELECT id, created_at, name, email, password_hash, version FROM users
WHERE email = $1`
	var user User
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	err := m.DB.QueryRowContext(ctx, query, email).Scan(&user.ID,
		&user.CreatedAt, &user.Name, &user.Email, &user.Password.hash, &user.Version,
	)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound
		default:
			return nil, err
		}
	}
	return &user, nil
}

func (m UserModel) Get(id int64) (*User, error) {
	if id < 1 {
		return nil, ErrRecordNotFound
	}

	query := `
SELECT
    users.id,
    users.created_at,
    users.name,
    users.email,
    users.sex_at_birth,
    users.provider_id,
    users.address_line_one,
    users.address_line_two,
    users.city,
    users.state,
    users.zip_code,
    users.phone_number,
    users.birthday,
users.has_completed_onboarding,
    users.version
FROM users
WHERE users.id = $1`
	var user User
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	err := m.DB.QueryRowContext(ctx, query, id).Scan(
		&user.ID,
		&user.CreatedAt,
		&user.Name,
		&user.Email,
		&user.SexAtBirth,
		&user.ProviderID,
		&user.AddressLineOne,
		&user.AddressLineTwo,
		&user.City,
		&user.State,
		&user.ZipCode,
		&user.PhoneNumber,
		&user.Birthday,
		&user.HasCompletedOnboarding,
		&user.Version,
	)

	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound
		default:
			return nil, err
		}
	}
	return &user, nil
}

func (m UserModel) Update(user *User) error {
	query := `
        UPDATE users
        SET name = $1, email = $2, provider_id = $3, version = version + 1
        WHERE id = $4 AND version = $5
        RETURNING version
    `
	args := []interface{}{user.Name, user.Email, user.ProviderID, user.ID, user.Version}
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	err := m.DB.QueryRowContext(ctx, query, args...).Scan(&user.Version)
	if err != nil {
		switch {
		case err.Error() == `pq: duplicate key value violates unique constraint "users_email_key"`:
			return ErrDuplicateEmail
		case errors.Is(err, sql.ErrNoRows):
			return ErrEditConflict
		default:
			return err
		}
	}
	return nil
}
func (m UserModel) GetForToken(tokenScope, tokenPlaintext string) (*User, error) {
	tokenHash := sha256.Sum256([]byte(tokenPlaintext))

	query := `
SELECT users.id, users.created_at, users.name, users.email, users.password_hash,  users.version FROM users
INNER JOIN tokens
ON users.id = tokens.user_id
WHERE tokens.hash = $1
AND tokens.scope = $2
AND tokens.expiry > $3`

	args := []interface{}{tokenHash[:], tokenScope, time.Now()}
	var user User
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	err := m.DB.QueryRowContext(ctx, query, args...).Scan(
		&user.ID, &user.CreatedAt, &user.Name, &user.Email, &user.Password.hash, &user.Version,
	)
	if err != nil {
		switch {
		case errors.Is(err, sql.ErrNoRows):
			return nil, ErrRecordNotFound
		default:
			return nil, err
		}
	}
	return &user, nil
}

func (m *UserModel) ExistsByEmail(email string) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`
	var exists bool
	err := m.DB.QueryRow(query, email).Scan(&exists)
	if err != nil {
		return false, err
	}
	return exists, nil
}

func (m UserModel) MarkOnboardingComplete(userID int64) error {
	query := `
        UPDATE users
        SET has_completed_onboarding = true, version = version + 1
        WHERE id = $1
        RETURNING version
    `
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	var version int
	err := m.DB.QueryRowContext(ctx, query, userID).Scan(&version)
	if err != nil {
		return err
	}

	return nil
}
