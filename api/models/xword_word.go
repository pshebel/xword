// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	strfmt "github.com/go-openapi/strfmt"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// XwordWord xword word
// swagger:model XwordWord
type XwordWord struct {

	// definition
	Definition string `json:"definition,omitempty"`

	// dir
	// Required: true
	Dir *int64 `json:"dir"`

	// idx
	// Required: true
	Idx *int64 `json:"idx"`

	// word id
	// Required: true
	WordID *int64 `json:"word_id"`

	// word len
	WordLen int64 `json:"word_len,omitempty"`
}

// Validate validates this xword word
func (m *XwordWord) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateDir(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateIdx(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateWordID(formats); err != nil {
		res = append(res, err)
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}

func (m *XwordWord) validateDir(formats strfmt.Registry) error {

	if err := validate.Required("dir", "body", m.Dir); err != nil {
		return err
	}

	return nil
}

func (m *XwordWord) validateIdx(formats strfmt.Registry) error {

	if err := validate.Required("idx", "body", m.Idx); err != nil {
		return err
	}

	return nil
}

func (m *XwordWord) validateWordID(formats strfmt.Registry) error {

	if err := validate.Required("word_id", "body", m.WordID); err != nil {
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (m *XwordWord) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *XwordWord) UnmarshalBinary(b []byte) error {
	var res XwordWord
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}