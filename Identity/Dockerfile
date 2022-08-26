# syntax=docker/dockerfile:1

FROM golang:latest
WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . .

EXPOSE 8081

RUN go build -o /docker-identity-ms cmd/main.go

CMD [ "/docker-identity-ms" ]