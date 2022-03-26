build:
	@docker build . --tag clancy-middleware

up:
	@docker-compose up -d --no-build

down:
	@docker-compose down -v
