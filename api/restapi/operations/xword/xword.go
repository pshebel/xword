package xword

import (
	"context"

	"github.com/pshebel/xword/util/log"

	middleware "github.com/go-openapi/runtime/middleware"
	"github.com/pshebel/xword/api/bus/xword"
	models "github.com/pshebel/xword/api/models"
)

func Get(params GetXwordParams) middleware.Responder {
	ctx := context.Background()
	x, err := xword.GetXword(ctx)
	if err != nil {
		log.Debug("failed to get xword: %v", err)
		status := models.ReturnCode{Code: int64(GetXwordInternalServerErrorCode), Message: err.Error()}
		return NewGetXwordInternalServerError().WithPayload(&status)
	}
	return NewGetXwordOK().WithPayload(&x)
}

func Post(params PostXwordParams) middleware.Responder {
	ctx := context.Background()
	err := xword.PostXword(ctx, *params.Xword)
	if err != nil {
		log.Debug("failed to insert xword: %v", err)
		status := models.ReturnCode{Code: int64(PostXwordInternalServerErrorCode), Message: err.Error()}
		return NewPostXwordInternalServerError().WithPayload(&status)
	}
	status := models.ReturnCode{Code: 200, Message: "post successful"}
	return NewPostXwordOK().WithPayload(&status)
}
