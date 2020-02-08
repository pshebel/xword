package log

import (
	"bytes"
	"log"
	"os"
)

var (
	buf   bytes.Buffer
	info  *log.Logger
	debug *log.Logger
)

func InitLogger(output *os.File, showDebug bool) {
	debugBuffer := output
	infoBuffer := output
	if !showDebug {
		debugBuffer = nil
	}

	debug = log.New(debugBuffer, "debug: ", log.Lshortfile)
	info = log.New(infoBuffer, "info: ", log.Lshortfile)
}

func Debug(format string, v ...interface{}) {
	if v != nil {
		debug.Printf(format, v)
	} else {
		debug.Println(format)
	}

}

func Info(format string, v ...interface{}) {
	if v != nil {
		info.Printf(format, v)
	} else {
		info.Println(format)
	}
}
