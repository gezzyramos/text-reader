PROJECT=`pwd | xargs basename`
TESTIMAGE=${PROJECT}:testing
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

setup:
	cp .env.example .env
	docker-compose up

key\:db:
	echo "Generating key..."
	docker-compose exec --user=${USER} application php artisan key:generate && php artisan config:clear
	echo "Migrating and seeding..."
	docker-compose exec --user=${USER} application php artisan migrate --seed

migrate:
	docker-compose exec --user=${USER} application php artisan migrate

code\:check:
	docker-compose exec --user=${USER} application vendor/bin/ecs check app --config easy-coding-standard.yml

code\:fix:
	docker-compose exec --user=${USER} application vendor/bin/ecs check app --config easy-coding-standard.yml --fix

test:
	docker-compose exec --user=${USER} application vendor/bin/phpunit
