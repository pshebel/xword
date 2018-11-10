// Code generated by go-swagger; DO NOT EDIT.

package xword

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	middleware "github.com/go-openapi/runtime/middleware"
)

// GetXwordHandlerFunc turns a function with the right signature into a get xword handler
type GetXwordHandlerFunc func(GetXwordParams) middleware.Responder

// Handle executing the request and returning a response
func (fn GetXwordHandlerFunc) Handle(params GetXwordParams) middleware.Responder {
	return fn(params)
}

// GetXwordHandler interface for that can handle valid get xword params
type GetXwordHandler interface {
	Handle(GetXwordParams) middleware.Responder
}

// NewGetXword creates a new http.Handler for the get xword operation
func NewGetXword(ctx *middleware.Context, handler GetXwordHandler) *GetXword {
	return &GetXword{Context: ctx, Handler: handler}
}

/*GetXword swagger:route GET /xword xword getXword

Get xword from app

*/
type GetXword struct {
	Context *middleware.Context
	Handler GetXwordHandler
}

func (o *GetXword) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		r = rCtx
	}
	var Params = NewGetXwordParams()

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}