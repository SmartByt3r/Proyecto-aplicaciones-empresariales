package main

import (
	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Identity/controllers"
	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Identity/database"
	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Identity/middlewares"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Database
	database.Connect("postgres://dev_admin:secret@postgresidentity:5432/identity")
	database.Migrate()

	// Initialize Router
	router := initRouter()
	router.Run(":8081")
}

func initRouter() *gin.Engine {
	router := gin.Default()
	router.Use(cors.Default())
	api := router.Group("/api")
	{
		api.POST("/token", controllers.GenerateToken)
		api.POST("/user", controllers.RegisterUser)

		secured := api.Group("/secured").Use(middlewares.Auth())
		{
			secured.GET("/ping", controllers.Ping)
		}
	}
	return router
}
