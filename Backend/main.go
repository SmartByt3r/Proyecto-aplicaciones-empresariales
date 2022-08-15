package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	ConfigureRoutes(router)
	router.Run(os.Getenv("PORT"))
}
