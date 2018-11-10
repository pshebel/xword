package db

import (
  // "fmt"
  "time"
  mgo "gopkg.in/mgo.v2"
)

var (
  host = "localhost"
  port = 27017
  dbName = ""
  timeout = 3
  user = ""
  pw = ""
)

func Connect() (*mgo.Session, error) {
  mongoDialInfo := &mgo.DialInfo{
    Addrs:    []string{host},
    Database: dbName,
    Username: user,
    Password: pw,
    Timeout:  time.Duration(timeout) * time.Second,
  }

  msession, err := mgo.DialWithInfo(mongoDialInfo)
  if err != nil {
    return nil, err
  }
  defer msession.Close()

  return msession.Clone(), nil
}

// func (msession *mgo.Session) Get(collection string, query bson.M, sort []string) ([]bson.M, error) {
// 	defer msession.Close()
//
// 	//set the write mongodb collection
// 	mcollection := msession.DB(dbName).C(collection)
//
// 	resp := []bson.M{}
//
// 	//query the db
// 	err := mcollection.Find(query).Sort(sort...).All(&resp)
// 	if err != nil {
// 		customError := errors.New(mongodb.Errors.DatabaseFindFailed.Error() + ";" + err.Error())
// 		a := &apperror.AppInfo{Msg: customError}
// 		a.LogError(a.Error(err))
// 		trace.SetEndTime(time.Now())
// 		return nil, a
// 	}
//
// 	//performance analysis - end
// 	trace.SetEndTime(time.Now())
//
// 	return resp, nil
// }
