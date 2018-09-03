package user

import (
  "fmt"
  "gopkg.in/mgo.v2/bson"
  "github.com/pshebel/xword/be/models"
  db "github.com/pshebel/xword/be/db"
  middleware "github.com/go-openapi/runtime/middleware"
)

var (
  collection = "users"
  database = "xword"
)

func Get(params GetUserParams) middleware.Responder {
  fmt.Println("GETTING USER", params)

  c, e := db.Connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(GetUserNotFoundCode), Message: "failed to connect to db"}
		response := GetUserNotFound{}
		return response.WithPayload(&status)
  }
  defer c.Close()

  query := bson.M{ "username": params.Username, }

  fmt.Println(query)
  var user models.User
  if err := c.DB(database).C(collection).Find(query).One(&user); err != nil {
    status := models.ReturnCode{Code: int64(GetUserNotFoundCode), Message: "failed to get Users"}
    response := GetUserNotFound{}
    return response.WithPayload(&status)
  }

  response := GetUserOK{}
  return response.WithPayload(&user)
}

func Post(params PostUserParams) middleware.Responder {
  fmt.Println("POST USER", params)

  c, e := db.Connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(PostUserNotFoundCode), Message: "failed to connect to db"}
    response := PostUserNotFound{}
    return response.WithPayload(&status)
  }
  defer c.Close()

  user := bson.M {
    "username": params.Username,
    "puzzles": 0,
    "words": 0,
  }

  if err := c.DB(database).C(collection).Insert(user); err != nil {
    status := models.ReturnCode{Code: int64(PostUserNotFoundCode), Message: "failed to insert user"}
    response := PostUserNotFound{}
    return response.WithPayload(&status)
  }

  status := models.ReturnCode{Code: 200, Message: "post successful"}
  response := PostUserOK{}
  return response.WithPayload(&status)
}

func Put(params PutUserParams) middleware.Responder {
  fmt.Println("PUTTING USER", params)

  c, e := db.Connect()
  if e != nil {
    status := models.ReturnCode{Code: int64(PutUserInternalServerErrorCode), Message: "failed to connect to db"}
		response := PutUserInternalServerError{}
		return response.WithPayload(&status)
  }

  selector := bson.M { "username": params.Username }
  update := bson.M { "$inc": bson.M { "puzzles": 1 } }
  if (params.Value == "words") {
    update = bson.M { "$inc": bson.M { "words": 1 } }
  }

  defer c.Close()
  if err := c.DB(database).C(collection).Update(selector, update); err != nil {
    status := models.ReturnCode{Code: int64(PutUserInternalServerErrorCode), Message: "failed to update User"}
		response := PutUserInternalServerError{}
		return response.WithPayload(&status)
  }

  status := models.ReturnCode{Code: 200, Message: "put successful"}
 	response := PutUserOK{}
 	return response.WithPayload(&status)
}
