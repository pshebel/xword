package word

import (
  "fmt"
  "gopkg.in/mgo.v2/bson"
  "github.com/pshebel/xword/be/models"
  db "github.com/pshebel/xword/be/db"
  middleware "github.com/go-openapi/runtime/middleware"
)

var (
  collection = "word"
  database = "xword"
)

func Get(params GetWordParams) middleware.Responder {
  fmt.Println("GETTING WORD", params, params.Length)

  c, e := db.Connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(GetWordNotFoundCode), Message: "failed to connect to db"}
		response := GetWordNotFound{}
		return response.WithPayload(&status)
  }
  defer c.Close()

  query := bson.M{}
  if params.Length != nil {
    query = bson.M {
      "$expr": bson.M {
          "$eq": []interface{}{bson.M{ "$strLenCP": "$word" }, *params.Length},
      },
    }
  }
  fmt.Println(query)
  var words models.Words
  if err := c.DB("xword").C(collection).Find(query).Sort("-when").All(&words); err != nil {
    status := models.ReturnCode{Code: int64(GetWordNotFoundCode), Message: "failed to get words"}
    response := GetWordNotFound{}
    return response.WithPayload(&status)
  }

  response := GetWordOK{}
  return response.WithPayload(words)
}

func Post(params PostWordParams) middleware.Responder {
  fmt.Println("POSTING WORD", params)

  c, e := db.Connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(PostWordInternalServerErrorCode), Message: "failed to connect to db"}
		response := PostWordInternalServerError{}
		return response.WithPayload(&status)
  }
  defer c.Close()
  if err := c.DB("xword").C(collection).Insert(params.Word); err != nil {
    status := models.ReturnCode{Code: int64(PostWordInternalServerErrorCode), Message: "failed to insert word"}
		response := PostWordInternalServerError{}
		return response.WithPayload(&status)
  }

  status := models.ReturnCode{Code: 200, Message: "post successful"}
 	response := PostWordOK{}
 	return response.WithPayload(&status)
}
