// Code generated by go-swagger; DO NOT EDIT.

package xword

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/pshebel/xword/api/models"
)

// PostXwordOKCode is the HTTP code returned for type PostXwordOK
const PostXwordOKCode int = 200

/*PostXwordOK Post xword successful response

swagger:response postXwordOK
*/
type PostXwordOK struct {

	/*
	  In: Body
	*/
	Payload *models.ReturnCode `json:"body,omitempty"`
}

// NewPostXwordOK creates PostXwordOK with default headers values
func NewPostXwordOK() *PostXwordOK {

	return &PostXwordOK{}
}

// WithPayload adds the payload to the post xword o k response
func (o *PostXwordOK) WithPayload(payload *models.ReturnCode) *PostXwordOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post xword o k response
func (o *PostXwordOK) SetPayload(payload *models.ReturnCode) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostXwordOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostXwordInternalServerErrorCode is the HTTP code returned for type PostXwordInternalServerError
const PostXwordInternalServerErrorCode int = 500

/*PostXwordInternalServerError Internal Server Error

swagger:response postXwordInternalServerError
*/
type PostXwordInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.ReturnCode `json:"body,omitempty"`
}

// NewPostXwordInternalServerError creates PostXwordInternalServerError with default headers values
func NewPostXwordInternalServerError() *PostXwordInternalServerError {

	return &PostXwordInternalServerError{}
}

// WithPayload adds the payload to the post xword internal server error response
func (o *PostXwordInternalServerError) WithPayload(payload *models.ReturnCode) *PostXwordInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post xword internal server error response
func (o *PostXwordInternalServerError) SetPayload(payload *models.ReturnCode) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostXwordInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

/*PostXwordDefault Post word unexpected error response

swagger:response postXwordDefault
*/
type PostXwordDefault struct {
	_statusCode int

	/*
	  In: Body
	*/
	Payload *models.ReturnCode `json:"body,omitempty"`
}

// NewPostXwordDefault creates PostXwordDefault with default headers values
func NewPostXwordDefault(code int) *PostXwordDefault {
	if code <= 0 {
		code = 500
	}

	return &PostXwordDefault{
		_statusCode: code,
	}
}

// WithStatusCode adds the status to the post xword default response
func (o *PostXwordDefault) WithStatusCode(code int) *PostXwordDefault {
	o._statusCode = code
	return o
}

// SetStatusCode sets the status to the post xword default response
func (o *PostXwordDefault) SetStatusCode(code int) {
	o._statusCode = code
}

// WithPayload adds the payload to the post xword default response
func (o *PostXwordDefault) WithPayload(payload *models.ReturnCode) *PostXwordDefault {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post xword default response
func (o *PostXwordDefault) SetPayload(payload *models.ReturnCode) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostXwordDefault) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(o._statusCode)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
