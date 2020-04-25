// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"strconv"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
)

// CheckXword check xword
//
// swagger:model CheckXword
type CheckXword struct {

	// words
	Words []*CheckWord `json:"words"`

	// xword id
	XwordID int64 `json:"xword_id,omitempty"`
}

// Validate validates this check xword
func (m *CheckXword) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateWords(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *CheckXword) validateWords(formats strfmt.Registry) error {

	if swag.IsZero(m.Words) { // not required
		return nil
	}

	for i := 0; i < len(m.Words); i++ {
		if swag.IsZero(m.Words[i]) { // not required
			continue
		}

		if m.Words[i] != nil {
			if err := m.Words[i].Validate(formats); err != nil {
				if ve, ok := err.(*errors.Validation); ok {
					return ve.ValidateName("words" + "." + strconv.Itoa(i))
				}
				return err
			}
		}

	}

	return nil
}

// MarshalBinary interface implementation
func (m *CheckXword) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *CheckXword) UnmarshalBinary(b []byte) error {
	var res CheckXword
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
