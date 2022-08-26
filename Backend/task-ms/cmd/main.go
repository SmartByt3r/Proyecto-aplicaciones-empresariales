package main

import (
	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Backend/task-ms/pkg/common/db"
	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Backend/task-ms/pkg/tasks"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func main() {
	viper.SetConfigFile("../pkg/common/envs/.env")
	viper.ReadInConfig()

	port := ":8082"
	dbUrl := "postgres://dev_admin:secret@postgrestask:5432/olympus"

	r := gin.Default()
	h := db.Init(dbUrl)

	tasks.RegisterRoutes(r, h)
	// register more routes here

	r.Run(port)
}
