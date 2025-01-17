package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func (app *application) serve() error {

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", app.config.port),
		Handler:      app.routes(),
		ErrorLog:     log.New(app.logger, "", 0), // port the error messages from stderr to our logger
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}
	// will receive errors from the Shutdown function
	shutdownError := make(chan error)

	// the go keyword means it is run concurrently so execution of the main thread won't block here
	go func() {
		// by specifying the second parameter, we are making the channel buffered
		// if the channel was not buffered, the write signal would have to block until the value is read by the thread, which is not what we want
		// we just want the system call to drop off the value
		// signal.Notify() apparently doesn't wait for the receiver to be ready because it uses select
		// if the channel is buffered and full or unbuffered and the receiver is ready
		quit := make(chan os.Signal, 1)

		// listen for the SIGINT and SIGTERM signals and relay them to the quit channel when they occur

		signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

		// code blocks here until one of the above signals is received"
		s := <-quit

		app.logger.PrintInfo("shutting down server", map[string]string{
			"signal": s.String(),
		})
		app.logger.PrintInfo("completing background tasks", map[string]string{
			"addr": srv.Addr})

		app.wg.Wait()

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		// give it 5 seconds to try shutting down and if successful shutdown will pass nil or if the context
		// expires then it will pass the error to the shut down channel
		err := srv.Shutdown(ctx)

		if err != nil {
			shutdownError <- srv.Shutdown(ctx)
		}
	}()

	app.logger.PrintInfo("starting server", map[string]string{"cfg": app.config.env, "addr": srv.Addr})

	err := srv.ListenAndServe()
	// we expected ErrServerClosed if the shutdown call is successful
	if !errors.Is(err, http.ErrServerClosed) {
		return err
	}

	err = <-shutdownError
	if err != nil {
		return err
	}
	app.logger.PrintInfo("server stopped successfully", map[string]string{"addr": srv.Addr})
	return nil

}
