package words

import (
	"context"

	"github.com/pshebel/xword/util/log"

	middleware "github.com/go-openapi/runtime/middleware"
	"github.com/pshebel/xword/api/bus/word"
	"github.com/pshebel/xword/api/models"
)

func Get(params GetWordsParams) middleware.Responder {
	ctx := context.Background()
	w, err := word.GetWords(ctx)
	if err != nil {
		log.Debug("failed to get words: %v", err)
		status := models.ReturnCode{Code: int64(GetWordsInternalServerErrorCode), Message: err.Error()}
		return NewGetWordsInternalServerError().WithPayload(&status)
	}
	return NewGetWordsOK().WithPayload(w)
}
