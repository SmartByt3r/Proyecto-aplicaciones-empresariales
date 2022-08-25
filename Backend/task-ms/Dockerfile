# syntax=docker/dockerfile:1

FROM golang:1.16-alpine
WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY *.go ./

EXPOSE 8080

RUN go build -o /docker-task-ms

CMD [ "/docker-task-ms" ]