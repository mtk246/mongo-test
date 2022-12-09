include .env
export

SHELL:=/bin/bash

test:
	npm run lint
	npm test

dev_install:
	npm install jest -g
	npm install nodemon -g
	npm install