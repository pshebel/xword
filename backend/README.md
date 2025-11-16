operations handles all the business logic. for this app that just means handling db queries
transport handles the http requests, unmarshalling of data, and creates the routes
models defines the objects
main.go handles the server init. sets up db connection and router before serving



/
    returns a random crossword puzzle
/{id}
    returns a puzzle with id



creating lambda layer

create a dir in layers
docker run --rm   --entrypoint /bin/bash   -v $(pwd)/layers:/var/task   public.ecr.aws/lambda/python:3.11   -c "pip install psycopg2-binary boto3 -t /var/task/python/"

zip -r layers/python 



