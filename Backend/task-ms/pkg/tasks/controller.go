package tasks

import (
	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
	"gorm.io/gorm"
)

type handler struct {
	DB *gorm.DB
}

func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	h := &handler{
		DB: db,
	}
	r.Use(cors.Default())
	routes := r.Group("/tasks")
	routes.POST("/", h.AddTask)
	routes.GET("/", h.GetTasks)
	routes.GET("/:id", h.GetTask)
	routes.PUT("/:id", h.UpdateTask)
	routes.DELETE("/:id", h.DeleteTask)
}
