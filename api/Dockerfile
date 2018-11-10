FROM busybox

# RUN GOOS=linux GOARCH=386 go build ./cmd-server/main.go

COPY ./main /home

CMD /home/main --port 4000 --host=0.0.0.0
