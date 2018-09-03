package users

import (
  "fmt"
  "github.com/pshebel/xword/be/models"
  db "github.com/pshebel/xword/be/db"
  middleware "github.com/go-openapi/runtime/middleware"
)

var (
  collection = "users"
  database = "xword"
)

func Get(params GetUsersParams) middleware.Responder {
  fmt.Println("GETTING USERS", params)

  c, e := db.Connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(GetUsersNotFoundCode), Message: "failed to connect to db"}
		response := GetUsersNotFound{}
		return response.WithPayload(&status)
  }
  defer c.Close()

  sort := "-puzzles"
  if params.Value != nil {
    if *params.Value == "words" {
      sort = "-words"
    }
  }

  var users models.Users
  if err := c.DB(database).C(collection).Find(nil).Sort(sort).All(&users); err != nil {
    status := models.ReturnCode{Code: int64(GetUsersNotFoundCode), Message: "failed to get words"}
    response := GetUsersNotFound{}
    return response.WithPayload(&status)
  }

  response := GetUsersOK{}
  return response.WithPayload(users)
}
