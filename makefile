run-dev:
	docker-compose -f docker-compose.yml up -d --build --force-recreate
down:
	docker-compose down