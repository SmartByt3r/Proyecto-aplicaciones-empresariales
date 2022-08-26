# syntax=docker/dockerfile:1

FROM golang:latest
WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

EXPOSE 8080

RUN go build -o /docker-task-ms cmd/main.go

CMD [ "/docker-task-ms" ]