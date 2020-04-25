// Code generated by go-swagger; DO NOT EDIT.

package xword_solve

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	"github.com/pshebel/xword/api/models"
)

// PutXwordSolvePuzzleOKCode is the HTTP code returned for type PutXwordSolvePuzzleOK
const PutXwordSolvePuzzleOKCode int = 200

/*PutXwordSolvePuzzleOK Check xword successful response

swagger:response putXwordSolvePuzzleOK
*/
type PutXwordSolvePuzzleOK struct {

	/*
	  In: Body
	*/
	Payload *models.ReturnCode `json:"body,omitempty"`
}

// NewPutXwordSolvePuzzleOK creates PutXwordSolvePuzzleOK with default headers values
func NewPutXwordSolvePuzzleOK() *PutXwordSolvePuzzleOK {

	return &PutXwordSolvePuzzleOK{}
}

// WithPayload adds the payload to the put xword solve puzzle o k response
func (o *PutXwordSolvePuzzleOK) WithPayload(payload *models.ReturnCode) *PutXwordSolvePuzzleOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the put xword solve puzzle o k response
func (o *PutXwordSolvePuzzleOK) SetPayload(payload *models.ReturnCode) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PutXwordSolvePuzzleOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// PutXwordSolvePuzzleInternalServerErrorCode is the HTTP code returned for type PutXwordSolvePuzzleInternalServerError
const PutXwordSolvePuzzleInternalServerErrorCode int = 500

/*PutXwordSolvePuzzleInternalServerError Internal Server Error

swagger:response putXwordSolvePuzzleInternalServerError
*/
type PutXwordSolvePuzzleInternalServerError struct {

	/*
	  In: Body
	*/
	Payload *models.ReturnCode `json:"body,omitempty"`
}

// NewPutXwordSolvePuzzleInternalServerError creates PutXwordSolvePuzzleInternalServerError with default headers values
func NewPutXwordSolvePuzzleInternalServerError() *PutXwordSolvePuzzleInternalServerError {

	return &PutXwordSolvePuzzleInternalServerError{}
}

// WithPayload adds the payload to the put xword solve puzzle internal server error response
func (o *PutXwordSolvePuzzleInternalServerError) WithPayload(payload *models.ReturnCode) *PutXwordSolvePuzzleInternalServerError {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the put xword solve puzzle internal server error response
func (o *PutXwordSolvePuzzleInternalServerError) SetPayload(payload *models.ReturnCode) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PutXwordSolvePuzzleInternalServerError) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(500)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

/*PutXwordSolvePuzzleDefault Post word unexpected error response

swagger:response putXwordSolvePuzzleDefault
*/
type PutXwordSolvePuzzleDefault struct {
	_statusCode int

	/*
	  In: Body
	*/
	Payload *models.ReturnCode `json:"body,omitempty"`
}

// NewPutXwordSolvePuzzleDefault creates PutXwordSolvePuzzleDefault with default headers values
func NewPutXwordSolvePuzzleDefault(code int) *PutXwordSolvePuzzleDefault {
	if code <= 0 {
		code = 500
	}

	return &PutXwordSolvePuzzleDefault{
		_statusCode: code,
	}
}

// WithStatusCode adds the status to the put xword solve puzzle default response
func (o *PutXwordSolvePuzzleDefault) WithStatusCode(code int) *PutXwordSolvePuzzleDefault {
	o._statusCode = code
	return o
}

// SetStatusCode sets the status to the put xword solve puzzle default response
func (o *PutXwordSolvePuzzleDefault) SetStatusCode(code int) {
	o._statusCode = code
}

// WithPayload adds the payload to the put xword solve puzzle default response
func (o *PutXwordSolvePuzzleDefault) WithPayload(payload *models.ReturnCode) *PutXwordSolvePuzzleDefault {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the put xword solve puzzle default response
func (o *PutXwordSolvePuzzleDefault) SetPayload(payload *models.ReturnCode) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *PutXwordSolvePuzzleDefault) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(o._statusCode)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
