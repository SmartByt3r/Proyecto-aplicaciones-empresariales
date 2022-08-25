package controllers

import (
	"jwt-authentication-golang/database"
	"jwt-authentication-golang/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func RegisterToDo(context *gin.Context) {
	var todo models.ToDo
	if err := context.ShouldBindJSON(&todo); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		context.Abort()
		return
	}

	record := database.Instance.Create(&todo)
	if record.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": record.Error.Error()})
		context.Abort()
		return
	}

	context.JSON(http.StatusCreated, gin.H{"todoId": todo.ID, "title": todo.Title, "description": todo.Description})
}

func GetAllToDo(context *gin.Context) {
	var todos []models.ToDo
	database.Instance.Find(&todos)
	context.JSON(200, todos)
}

func GetByIdToDo(context *gin.Context) {
	todoID := context.Param("id")
	var todo models.ToDo
	database.Instance.Find(&todo, todoID)

	if todo.ID == 0 {
		context.JSON(404, "ToDo Not Found")
		return
	}

	context.JSON(200, todo)
}

func UpdateToDo(context *gin.Context) {
	todoID := context.Param("id")
	status := context.Query("status")
	var todo models.ToDo
	database.Instance.Find(&todo, todoID)

	if todo.ID == 0 {
		context.JSON(404, "ToDo Not Found")
		return
	}

	todo.Status = status
	database.Instance.Save(&todo)
	context.JSON(200, todo)
}

func DeleteToDo(context *gin.Context) {
	todoID := context.Param("id")
	var todo models.ToDo
	database.Instance.Find(&todo, todoID)

	if todo.ID == 0 {
		context.JSON(404, "ToDo Not Found")
		return
	}

	database.Instance.Delete(&todo)
	context.JSON(204, "")
}

func GetByUser(context *gin.Context) {
	UserID := context.Param("id")

	var todos []models.ToDo

	database.Instance.Where("user_id = ?", UserID).Find(&todos)
	context.JSON(200, todos)
}
