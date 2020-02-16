package user

import (
	"context"

	"github.com/pshebel/xword/util/log"

	middleware "github.com/go-openapi/runtime/middleware"
	"github.com/pshebel/xword/api/bus/user"
	"github.com/pshebel/xword/api/models"
)

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
