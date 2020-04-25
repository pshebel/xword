// Code generated by go-swagger; DO NOT EDIT.

package word

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/pshebel/xword/api/models"
)

// PostWordOKCode is the HTTP code returned for type PostWordOK
const PostWordOKCode int = 200

/*PostWordOK Post word successful response

swagger:response postWordOK
*/
type PostWordOK struct {

	/*
	  In: Body
	*/
	Payload *models.ReturnCode `json:"body,omitempty"`
}

// NewPostWordOK creates PostWordOK with default headers values
func NewPostWordOK() *PostWordOK {

	return &PostWordOK{}
}

// WithPayload adds the payload to the post word o k response
func (o *PostWordOK) WithPayload(payload *models.ReturnCode) *PostWordOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post word o k response
func (o *PostWordOK) SetPayload(payload *models.ReturnCode) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostWordOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PostWordInternalServerErrorCode is the HTTP code returned for type PostWordInternalServerError
const PostWordInternalServerErrorCode int = 500

/*PostWordInternalServerError Internal Server Error

swagger:response postWordInternalServerError
*/
type PostWordInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.ReturnCode `json:"body,omitempty"`
}

// NewPostWordInternalServerError creates PostWordInternalServerError with default headers values
func NewPostWordInternalServerError() *PostWordInternalServerError {

	return &PostWordInternalServerError{}
}

// WithPayload adds the payload to the post word internal server error response
func (o *PostWordInternalServerError) WithPayload(payload *models.ReturnCode) *PostWordInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post word internal server error response
func (o *PostWordInternalServerError) SetPayload(payload *models.ReturnCode) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostWordInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

/*PostWordDefault Post word unexpected error response

swagger:response postWordDefault
*/
type PostWordDefault struct {
	_statusCode int

	/*
	  In: Body
	*/
	Payload *models.ReturnCode `json:"body,omitempty"`
}

// NewPostWordDefault creates PostWordDefault with default headers values
func NewPostWordDefault(code int) *PostWordDefault {
	if code <= 0 {
		code = 500
	}

	return &PostWordDefault{
		_statusCode: code,
	}
}

// WithStatusCode adds the status to the post word default response
func (o *PostWordDefault) WithStatusCode(code int) *PostWordDefault {
	o._statusCode = code
	return o
}

// SetStatusCode sets the status to the post word default response
func (o *PostWordDefault) SetStatusCode(code int) {
	o._statusCode = code
}

// WithPayload adds the payload to the post word default response
func (o *PostWordDefault) WithPayload(payload *models.ReturnCode) *PostWordDefault {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the post word default response
func (o *PostWordDefault) SetPayload(payload *models.ReturnCode) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PostWordDefault) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(o._statusCode)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
