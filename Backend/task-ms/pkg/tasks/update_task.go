package tasks

import (
	"net/http"

	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Backend/task-ms/auth"
	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Backend/task-ms/pkg/common/models"
	"github.com/gin-gonic/gin"
)

type UpdateTaskRequestBody struct {
	Title       string `json:"title"`
	Status      string `json:"status"`
	Description string `json:"description"`
}

func (h handler) UpdateTask(c *gin.Context) {
	id := c.Param("id")
	body := UpdateTaskRequestBody{}

	tokenString := c.GetHeader("Authorization")
	userId, err := auth.ValidateToken(tokenString)

	if err != nil {
		c.JSON(401, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	// getting request's body
	if err := c.BindJSON(&body); err != nil {
		c.AbortWithError(http.StatusBadRequest, err)
		return
	}

	var task models.Task

	if result := h.DB.Where("user_id = ?", userId).First(&task, id); result.Error != nil {
		c.AbortWithError(http.StatusNotFound, result.Error)
		return
	}

	task.Title = body.Title
	task.Status = body.Status
	task.Description = body.Description

	h.DB.Save(&task)

	c.JSON(http.StatusOK, &task)
}
