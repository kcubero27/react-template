#!/bin/bash

CLIENT = reactql
UID = $(shell id -u)

help: ## Show this help message
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

run: ## Start the containers
	U_ID=${UID} docker-compose up -d

npm-install: ## Install node_modules
	U_ID=${UID} U_ID=${UID} docker exec -it ${CLIENT} npm install

stop: ## Stop the containers
	U_ID=${UID} docker-compose down

restart: ## Restart the containers
	U_ID=${UID} docker-compose down && U_ID=${UID} docker-compose up -d

build: ## Rebuilds all the containers
	U_ID=${UID} docker-compose build

ssh: ## ssh's into the be container
	U_ID=${UID} docker exec -it ${CLIENT} bash