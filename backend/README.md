operations handles all the business logic. for this app that just means handling db queries
transport handles the http requests, unmarshalling of data, and creates the routes
models defines the objects
main.go handles the server init. sets up db connection and router before serving



/
    returns a random crossword puzzle
/{id}
    returns a puzzle with id

