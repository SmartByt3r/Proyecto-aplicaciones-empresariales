package db

import (
	"log"

	"github.com/SmartByt3r/Proyecto-aplicaciones-empresariales/Backend/task-ms/pkg/common/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Init(url string) *gorm.DB {
	db, err := gorm.Open(postgres.Open(url), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	db.AutoMigrate(&models.Task{})

	return db
}
