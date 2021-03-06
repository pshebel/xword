// Code generated by go-swagger; DO NOT EDIT.

package user

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/validate"
)

// NewPutUserParams creates a new PutUserParams object
// no default values defined in spec.
func NewPutUserParams() PutUserParams {

	return PutUserParams{}
}

// PutUserParams contains all the bound params for the put user operation
// typically these are obtained from a http.Request
//
// swagger:parameters PutUser
type PutUserParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`

	/*name identifying the user
	  Required: true
	  In: query
	*/
	Username string
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewPutUserParams() beforehand.
func (o *PutUserParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	qs := runtime.Values(r.URL.Query())

	qUsername, qhkUsername, _ := qs.GetOK("username")
	if err := o.bindUsername(qUsername, qhkUsername, route.Formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

// bindUsername binds and validates parameter Username from query.
func (o *PutUserParams) bindUsername(rawData []string, hasKey bool, formats strfmt.Registry) error {
	if !hasKey {
		return errors.Required("username", "query")
	}
	var raw string
	if len(rawData) > 0 {
		raw = rawData[len(rawData)-1]
	}

	// Required: true
	// AllowEmptyValue: false
	if err := validate.RequiredString("username", "query", raw); err != nil {
		return err
	}

	o.Username = raw

	return nil
}
