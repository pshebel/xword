// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"net/http"

	"github.com/rs/cors"
	errors "github.com/go-openapi/errors"
	runtime "github.com/go-openapi/runtime"
	middleware "github.com/go-openapi/runtime/middleware"

	"github.com/pshebel/xword/api/restapi/operations"
	"github.com/pshebel/xword/api/restapi/operations/word"
	"github.com/pshebel/xword/api/restapi/operations/user"
	"github.com/pshebel/xword/api/restapi/operations/users"
	"github.com/pshebel/xword/api/restapi/operations/xword"
)

//go:generate swagger generate server --target .. --name API --spec ../swagger.yml

func configureFlags(api *operations.API) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.API) http.Handler {
	// configure the api here
	api.ServeError = errors.ServeError

	// Set your custom logger if needed. Default one is log.Printf
	// Expected interface func(string, ...interface{})
	//
	// Example:
	// api.Logger = log.Printf

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	// Xword functions
	api.XwordGetXwordHandler = xword.GetXwordHandlerFunc(func(params xword.GetXwordParams) middleware.Responder {
		return xword.Get(params)
	})

	api.XwordPostXwordHandler = xword.PostXwordHandlerFunc(func(params xword.PostXwordParams) middleware.Responder {
		return xword.Post(params)
	})

	// Word functions
	api.WordGetWordHandler = word.GetWordHandlerFunc(func(params word.GetWordParams) middleware.Responder {
		return word.Get(params)
	})

	api.WordPostWordHandler = word.PostWordHandlerFunc(func(params word.PostWordParams) middleware.Responder {
		return word.Post(params)
	})

	// User functions
	api.UserGetUserHandler = user.GetUserHandlerFunc(func(params user.GetUserParams) middleware.Responder {
		return user.Get(params)
	})

	api.UserPostUserHandler = user.PostUserHandlerFunc(func(params user.PostUserParams) middleware.Responder {
		return user.Post(params)
	})

	api.UserPutUserHandler = user.PutUserHandlerFunc(func(params user.PutUserParams) middleware.Responder {
		return user.Put(params)
	})

	// Users function
	api.UsersGetUsersHandler = users.GetUsersHandlerFunc(func(params users.GetUsersParams) middleware.Responder {
		return users.Get(params)
	})

	api.ServerShutdown = func() {}

	return setupGlobalMiddleware(api.Serve(setupMiddlewares))
}

// The TLS configuration before HTTPS server starts.
func configureTLS(tlsConfig *tls.Config) {
	// Make all necessary changes to the TLS configuration here.
}

// As soon as server is initialized but not run yet, this function will be called.
// If you need to modify a config, store server instance to stop it individually later, this is the place.
// This function can be called multiple times, depending on the number of serving schemes.
// scheme value will be set accordingly: "http", "https" or "unix"
func configureServer(s *http.Server, scheme, addr string) {
}

// The middleware configuration is for the handler executors. These do not apply to the swagger.json document.
// The middleware executes after routing but before authentication, binding and validation
func setupMiddlewares(handler http.Handler) http.Handler {
	return handler
}

// The middleware configuration happens before anything, this middleware also applies to serving the swagger.json document.
// So this is a good place to plug in a panic handling middleware, logging and metrics
func setupGlobalMiddleware(handler http.Handler) http.Handler {
	corsHandler := cors.New(cors.Options{
		Debug:          true,
		AllowedHeaders: []string{"*"},
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "OPTIONS", "POST", "PUT"},
		//AllowCredentials: true,
		MaxAge: 1000,
	})
	return corsHandler.Handler(handler)
}