FROM golang:latest as builder

RUN mkdir /build
COPY go.mod /build/
COPY api/ /build/api
COPY util/ /build/util
WORKDIR /build
RUN go mod download
RUN ls
RUN GOOS=linux GOARCH=386 go build ./api/cmd-server/main.go


FROM busybox
COPY --from=builder ./build /home
CMD /home/main --port 8000 --host=0.0.0.0
