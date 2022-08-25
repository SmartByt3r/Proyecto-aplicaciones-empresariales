package main

import (
	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Identity/controllers"
	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Identity/database"
	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Identity/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Database
	database.Connect("postgres://dev_admin:secret@localhost:5432/identity")
	database.Migrate()

	// Initialize Router
	router := initRouter()
	router.Run(":8080")
}

func initRouter() *gin.Engine {
	router := gin.Default()
	api := router.Group("/api")
	{
		api.POST("/token", controllers.GenerateToken)
		api.POST("/user", controllers.RegisterUser)

		todo := api.Group("/todo").Use(middlewares.Auth())
		{
			todo.POST("", controllers.RegisterToDo)
			todo.GET("", controllers.GetAllToDo)
			todo.GET("/:id", controllers.GetByIdToDo)
			todo.GET("/user/:id", controllers.GetByUser)
			todo.PUT("/:id", controllers.UpdateToDo)
			todo.DELETE("/:id", controllers.DeleteToDo)
		}

		secured := api.Group("/secured").Use(middlewares.Auth())
		{
			secured.GET("/ping", controllers.Ping)
		}
	}
	return router
}
