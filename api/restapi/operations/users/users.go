package users

import (
	"context"

	"github.com/pshebel/xword/util/log"

	middleware "github.com/go-openapi/runtime/middleware"
	"github.com/pshebel/xword/api/bus/user"
	models "github.com/pshebel/xword/api/models"
)

func Get(params GetUsersParams) middleware.Responder {
	ctx := context.Background()
	u, err := user.GetUsers(ctx)
	if err != nil {
		log.Debug("failed to get user: %v", err)
		status := models.ReturnCode{Code: int64(GetUsersInternalServerErrorCode), Message: err.Error()}
		return NewGetUsersInternalServerError().WithPayload(&status)
	}
	return NewGetUsersOK().WithPayload(u)
}
