package db

import (
  "fmt"
  redis "github.com/go-redis/redis"
)

func Connect() {
  redisdb := redis.NewClient(&redis.Options{
      Addr:     "localhost:6379",
      Password: "", // no password set
      DB:       0,  // use default DB
  })

  pong, err := redisdb.Ping().Result()
  fmt.Println(pong, err)
}
