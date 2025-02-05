package main

import (
	"context"
	"database/sql"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/wjdittmar/textCare/internal/terminology/models"
)

type application struct {
	config Config
	logger *log.Logger
	models *models.TerminologyModel
}

func main() {

	db, err := openDB()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	//cache := models.NewRedisCache(os.Getenv("REDIS_ADDR"))

	app := &application{
		logger: log.New(os.Stdout, "", log.LstdFlags),
		models: &models.TerminologyModel{
			DB:    db,
			Cache: cache,
		},
	}

	srv := &http.Server{
		Addr:         ":4000",
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	log.Printf("Starting terminology server on %s", srv.Addr)
	err = srv.ListenAndServe()
	log.Fatal(err)
}
