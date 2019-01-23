USER=drupal

up:
	docker-compose up --build

down:
	docker-compose down

stop:
	docker-compose stop

sh:
	docker-compose exec adonis sh

sh\:db:
	docker-compose exec db bash

migrate:
	docker-compose exec --user=${USER} application php artisan migrate
