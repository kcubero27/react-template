CLIENT = reactql
UID = $(shell id -u)

help:
	@echo 'usage: make [target]'
	@echo
	@echo 'targets:'
	@egrep '^(.+)\:\ ##\ (.+)' ${MAKEFILE_LIST} | column -t -c 2 -s ':#'

run:
	U_ID=${UID} docker-compose up -d

npm-install:
	U_ID=${UID} U_ID=${UID} docker exec -it ${CLIENT} npm install

stop:
	U_ID=${UID} docker-compose down

restart:
	U_ID=${UID} docker-compose down && U_ID=${UID} docker-compose up -d

build:
	U_ID=${UID} docker-compose build

bash:
	U_ID=${UID} docker exec -it ${CLIENT} bash