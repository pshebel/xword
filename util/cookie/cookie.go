package cookie

import (
	"net/http"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/runtime/middleware"
)

// go swagger does not allow you to access the response so we have to write
// a custom responder.
// based on https://github.com/go-swagger/go-swagger/issues/748

type CookieResponder struct {
	cookie    http.Cookie
	responder middleware.Responder
}

func NewCookieResponder(cookie http.Cookie, responder middleware.Responder) *CookieResponder {
	return &CustomResponder{
		cookie:    cookie,
		responder: responder,
	}
}

func (r *CookieResponder) WriteResponse(rw http.ResponseWriter, p runtime.Producer) {
	http.SetCookie(rw, &r.cookie)
	r.responder.WriteResponse(rw, p)
}
