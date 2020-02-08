package user

import (
	"context"

	"github.com/pshebel/xword/util/log"

	middleware "github.com/go-openapi/runtime/middleware"
	"github.com/pshebel/xword/api/bus/user"
	"github.com/pshebel/xword/api/models"
)

func Get(params GetUserParams) middleware.Responder {
	ctx := context.Background()
	u, err := user.GetUser(ctx, params.Username)
	if err != nil {
		log.Debug("failed to get user: %v", err)
		status := models.ReturnCode{Code: int64(GetUserInternalServerErrorCode), Message: err.Error()}
		return NewGetUserInternalServerError().WithPayload(&status)
	}
	return NewGetUserOK().WithPayload(&u)
}

func Post(params PostUserParams) middleware.Responder {
	ctx := context.Background()
	err := user.PostUser(ctx, params.Username)
	if err != nil {
		log.Debug("failed to insert user: %v", err)
		status := models.ReturnCode{Code: int64(GetUserInternalServerErrorCode), Message: err.Error()}
		return NewGetUserInternalServerError().WithPayload(&status)
	}
	status := models.ReturnCode{Code: 200, Message: "post successful"}
	return NewPostUserOK().WithPayload(&status)
}

func Put(params PutUserParams) middleware.Responder {
	ctx := context.Background()
	user, err := user.PutUser(ctx, params.Username)
	if err != nil {
		log.Debug("failed to update user: %v", err)
		status := models.ReturnCode{Code: int64(PutUserInternalServerErrorCode), Message: err.Error()}
		return NewPutUserInternalServerError().WithPayload(&status)
	}
	return NewPutUserOK().WithPayload(&user)
	// cookie := http.Cookie{Name: "username", Value: params.Username}
	// need to use custom responder to send cookies
	// responder := NewCookieResponder(cookie, NewPostUserOK().WithPayload(&user))
	// return responder
}
