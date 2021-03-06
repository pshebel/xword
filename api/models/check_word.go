// Code generated by go-swagger; DO NOT EDIT.

package models

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"github.com/go-openapi/errors"
	"github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"
	"github.com/go-openapi/validate"
)

// CheckWord check word
//
// swagger:model CheckWord
type CheckWord struct {

	// dir
	// Required: true
	Dir *int64 `json:"dir"`

	// idx
	// Required: true
	Idx *int64 `json:"idx"`

	// input
	// Required: true
	Input *string `json:"input"`

	// word id
	// Required: true
	WordID *int64 `json:"word_id"`
}

// Validate validates this check word
func (m *CheckWord) Validate(formats strfmt.Registry) error {
	var res []error

	if err := m.validateDir(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateIdx(formats); err != nil {
		res = append(res, err)
	}

	if err := m.validateInput(formats); err != nil {
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

func (m *CheckWord) validateDir(formats strfmt.Registry) error {

	if err := validate.Required("dir", "body", m.Dir); err != nil {
		return err
	}

	return nil
}

func (m *CheckWord) validateIdx(formats strfmt.Registry) error {

	if err := validate.Required("idx", "body", m.Idx); err != nil {
		return err
	}

	return nil
}

func (m *CheckWord) validateInput(formats strfmt.Registry) error {

	if err := validate.Required("input", "body", m.Input); err != nil {
		return err
	}

	return nil
}

func (m *CheckWord) validateWordID(formats strfmt.Registry) error {

	if err := validate.Required("word_id", "body", m.WordID); err != nil {
		return err
	}

	return nil
}

// MarshalBinary interface implementation
func (m *CheckWord) MarshalBinary() ([]byte, error) {
	if m == nil {
		return nil, nil
	}
	return swag.WriteJSON(m)
}

// UnmarshalBinary interface implementation
func (m *CheckWord) UnmarshalBinary(b []byte) error {
	var res CheckWord
	if err := swag.ReadJSON(b, &res); err != nil {
		return err
	}
	*m = res
	return nil
}
