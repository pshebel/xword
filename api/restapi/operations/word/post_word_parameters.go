// Code generated by go-swagger; DO NOT EDIT.

package word

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"io"
	"net/http"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"

	"github.com/pshebel/xword/api/models"
)

// NewPostWordParams creates a new PostWordParams object
// no default values defined in spec.
func NewPostWordParams() PostWordParams {

	return PostWordParams{}
}

// PostWordParams contains all the bound params for the post word operation
// typically these are obtained from a http.Request
//
// swagger:parameters PostWord
type PostWordParams struct {

	// HTTP Request Object
	HTTPRequest *http.Request `json:"-"`

	/*New word and definition
	  Required: true
	  In: body
	*/
	Word *models.Word
}

// BindRequest both binds and validates a request, it assumes that complex things implement a Validatable(strfmt.Registry) error interface
// for simple values it will use straight method calls.
//
// To ensure default values, the struct must have been initialized with NewPostWordParams() beforehand.
func (o *PostWordParams) BindRequest(r *http.Request, route *middleware.MatchedRoute) error {
	var res []error

	o.HTTPRequest = r

	if runtime.HasBody(r) {
		defer r.Body.Close()
		var body models.Word
		if err := route.Consumer.Consume(r.Body, &body); err != nil {
			if err == io.EOF {
				res = append(res, errors.Required("word", "body"))
			} else {
				res = append(res, errors.NewParseError("word", "body", "", err))
			}
		} else {
			// validate body object
			if err := body.Validate(route.Formats); err != nil {
				res = append(res, err)
			}

			if len(res) == 0 {
				o.Word = &body
			}
		}
	} else {
		res = append(res, errors.Required("word", "body"))
	}
	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}
