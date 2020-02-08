package word

import (
	"context"

	"github.com/pshebel/xword/util/log"

	middleware "github.com/go-openapi/runtime/middleware"
	"github.com/pshebel/xword/api/bus/word"
	"github.com/pshebel/xword/api/constant"
	"github.com/pshebel/xword/api/models"
)

func Post(params PostWordParams, principle interface{}) middleware.Responder {
	ctx := context.Background()
	username := principle.(*constant.Username)
	err := word.PostWord(ctx, *params.Word, username.Value)
	if err != nil {
		log.Debug("failed to insert word: %v", err)
		status := models.ReturnCode{Code: int64(PostWordInternalServerErrorCode), Message: err.Error()}
		return NewPostWordInternalServerError().WithPayload(&status)
	}
	status := models.ReturnCode{Code: 200, Message: "post successful"}
	return NewPostWordOK().WithPayload(&status)
}
