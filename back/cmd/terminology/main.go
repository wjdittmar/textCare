package main

import (
	"context"
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/wjdittmar/textCare/back/internal/config"
	"github.com/wjdittmar/textCare/back/internal/data"
	"github.com/wjdittmar/textCare/back/internal/jsonlog"
	"log"
	"os"
	"sync"
	"time"
)

const version = "1.0.0"

type application struct {
	config config.Config
	logger *jsonlog.Logger
	models data.TerminologyModels
	wg     sync.WaitGroup
}

func main() {
	var cfg *config.Config
	var err error

	termLogFile, err := os.OpenFile("term.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err)
	}

	defer termLogFile.Close()

	logger := jsonlog.New(termLogFile, jsonlog.LevelInfo)

	cfg, err = config.LoadConfig()

	if err != nil {
		logger.PrintFatal(err, nil)
	}

	db, err := openDB(*cfg)

	if err != nil {
		logger.PrintFatal(err, nil)
	}

	// Defer a call to db.Close() so that the connection pool is closed before the
	// main() function exits.
	logger.PrintInfo(fmt.Sprintf("CORS allowed origins: %v", cfg.CORSAllowedOrigins), nil)

	if err != nil {
		logger.PrintFatal(err, nil)
	}
	defer db.Close()

	logger.PrintInfo("database connection pool established", nil)

	app := &application{
		config: *cfg,
		logger: logger,
		models: data.NewTerminologyModels(db),
	}

	err = app.serve()
	if err != nil {
		logger.PrintFatal(err, nil)
	}
}

func openDB(cfg config.Config) (*sql.DB, error) {
	db, err := sql.Open("postgres", cfg.DB.DSN)
	if err != nil {
		return nil, err
	}

	// Set the maximum number of open (in-use + idle) connections in the pool

	db.SetMaxOpenConns(cfg.DB.MaxOpenConns)
	db.SetMaxIdleConns(cfg.DB.MaxIdleConns)

	duration, err := time.ParseDuration(cfg.DB.MaxIdleTime)
	if err != nil {
		return nil, err
	}
	// Set the maximum idle timeout.
	db.SetConnMaxIdleTime(duration)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err = db.PingContext(ctx)
	// if we can't ping it in 5 seconds return an error
	if err != nil {
		return nil, err
	}
	return db, nil
}
