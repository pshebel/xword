// Code generated by go-swagger; DO NOT EDIT.

package user

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	middleware "github.com/go-openapi/runtime/middleware"
)

// PutUserHandlerFunc turns a function with the right signature into a put user handler
type PutUserHandlerFunc func(PutUserParams) middleware.Responder

// Handle executing the request and returning a response
func (fn PutUserHandlerFunc) Handle(params PutUserParams) middleware.Responder {
	return fn(params)
}

// PutUserHandler interface for that can handle valid put user params
type PutUserHandler interface {
	Handle(PutUserParams) middleware.Responder
}

// NewPutUser creates a new http.Handler for the put user operation
func NewPutUser(ctx *middleware.Context, handler PutUserHandler) *PutUser {
	return &PutUser{Context: ctx, Handler: handler}
}

/*PutUser swagger:route PUT /user user putUser

Increments value of user

*/
type PutUser struct {
	Context *middleware.Context
	Handler PutUserHandler
}

func (o *PutUser) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		r = rCtx
	}
	var Params = NewPutUserParams()

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}
