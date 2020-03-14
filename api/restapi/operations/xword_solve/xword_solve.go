package xword_solve

import (
	"context"

	"github.com/pshebel/xword/api/bus/xword"
	"github.com/pshebel/xword/api/constant"
	"github.com/pshebel/xword/util/log"

	middleware "github.com/go-openapi/runtime/middleware"
	models "github.com/pshebel/xword/api/models"
)

func Put(params PutXwordSolvePuzzleParams, principle interface{}) middleware.Responder {
	log.Debug("PutXwordSolvePuzzle")
	ctx := context.Background()
	username := principle.(*constant.Username)
	res, err := xword.CheckXword(ctx, *params.Xword, username.Value)
	if err != nil {
		log.Debug("failed to insert xword: %v", err)
		status := models.ReturnCode{Code: int64(PutXwordSolvePuzzleInternalServerErrorCode), Message: err.Error()}
		return NewPutXwordSolvePuzzleInternalServerError().WithPayload(&status)
	}
	var message string
	if res {
		message = "correct"
	} else {
		message = "incorrect"
	}
	status := models.ReturnCode{Code: 200, Message: message}
	return NewPutXwordSolvePuzzleOK().WithPayload(&status)

}
