package transport

import (
        "fmt"
        "net/http"
)

func GetBlogsHanlder(w http.ResponseWriter, r *http.Request) {
        // parse json to model

        // pass to operations function
        fmt.Print("get blogs")
}
func GetBlogIdHandler(w http.ResponseWriter, r *http.Request) {
        fmt.Print("get blog id")
} 
