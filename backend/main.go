package main

import (
	"os"
	"log/slog"

	_ "github.com/pshebel/xword/backend/database"
	"github.com/pshebel/xword/backend/server"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
		AddSource: true, // This adds the file and line number!
	}))
	slog.SetDefault(logger)

	slog.Info("server starting", "version", 0)
	srv := server.GetServer()
	err := srv.ListenAndServe()
	if err != nil {
		slog.Error("server failed to start", "error", err)
        	os.Exit(1)
	}
}
