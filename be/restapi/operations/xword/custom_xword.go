package xword

import (
  "fmt"
  "github.com/pshebel/xword/be/models"
  "gopkg.in/mgo.v2/bson"
  db "github.com/pshebel/xword/be/db"
  middleware "github.com/go-openapi/runtime/middleware"
)

var (
  database = "xword"
  collection = "xword"
)


func Get(params GetXwordParams) middleware.Responder {
  fmt.Println("GETTING XWORD", params)
  c, e := db.Connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(GetXwordNotFoundCode), Message: "failed to connect to db"}
    response := GetXwordNotFound{}
    return response.WithPayload(&status)
  }

  var xword *models.Xword
  if err := c.DB(database).C(collection).Find(nil).One(&xword); err != nil {
    status := models.ReturnCode{Code: int64(GetXwordNotFoundCode), Message: "failed to get from db"}
    response := GetXwordNotFound{}
    return response.WithPayload(&status)
  }

  // NEED TO UNCOMMENT THIS FOR PROD

  // if err := c.DB(database).C(collection).Remove(bson.M{"id": xword.ID}); err != nil {
  //   status := models.ReturnCode{Code: int64(GetXwordNotFoundCode), Message: "failed to remove from db"}
  //   response := GetXwordNotFound{}
  //   return response.WithPayload(&status)
  // }

  response := GetXwordOK{}
  return response.WithPayload(xword)
}

func Post(params PostXwordParams) middleware.Responder {
  fmt.Println("POSTING XWORD", params)

  c, e := db.Connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(PostXwordInternalServerErrorCode), Message: "failed to connect to db"}
		response := PostXwordInternalServerError{}
		return response.WithPayload(&status)
  }

  params.Xword.ID = bson.NewObjectId().String()

  if err := c.DB(database).C(collection).Insert(params.Xword); err != nil {
    status := models.ReturnCode{Code: int64(PostXwordInternalServerErrorCode), Message: "failed to insert Xword"}
		response := PostXwordInternalServerError{}
		return response.WithPayload(&status)
  }

  status := models.ReturnCode{Code: 200, Message: "post successful"}
 	response := PostXwordOK{}
 	return response.WithPayload(&status)
}
