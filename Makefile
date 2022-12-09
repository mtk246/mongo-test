include .env

SHELL := /bin/bash

.SILENT: help
.SILENT: gen_route

test:
	npm run lint
	npm test

dev_install:
	npm install jest -g
	npm install nodemon -g
	npm install

gen_model:
	echo "Generating model ${model}"
	gentool -outPath models -db postgres -dsn "user=${DB_USER} dbname=${DB_NAME} password=${DB_PASS} host=${DB_HOST} port=${DB_PORT} sslmode=disable" -tables "${model}"

gen_all_model:
	echo "Generating All Model"
	gentool -outPath models -db postgres -dsn "user=${DB_USER} dbname=${DB_NAME} password=${DB_PASS} host=${DB_HOST} port=${DB_PORT} sslmode=disable" -tables ""

