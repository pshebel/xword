package xword

import (
  "github.com/pshebel/xword/app/models"
  db "github.com/pshebel/xword/app/db"
  middleware "github.com/go-openapi/runtime/middleware"
)

func Get(params GetWordParams) middleware.Responder {
  c, e := db.connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(PostWordInternalServerErrorCode), Message: "failed to connect to db"}
		response := PostWordInternalServerErrorCode{}
		return response.WithPayload(&status)
  }

  var words models.Words
}

func Post(params PostWordParams) middleware.Responder {
  c, e := db.connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(PostWordInternalServerErrorCode), Message: "failed to connect to db"}
		response := PostWordInternalServerErrorCode{}
		return response.WithPayload(&status)
  }

  var word models.Word
  if err := json.NewDecoder(*params.Word).Decode(&word); err != nil {
    status := models.ReturnCode{Code: int64(PostWordBadRequestCode), Message: "could not unmarshal word"}
		response := PostWordBadRequestCode{}
		return response.WithPayload(&status)
  }

  if err := c.DB("").C("words").Insert(&word); err != nil {
    status := models.ReturnCode{Code: int64(PostWordInternalServerErrorCode), Message: "failed to insert word"}
		response := PostWordInternalServerErrorCode{}
		return response.WithPayload(&status)
  }
}
