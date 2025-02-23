## help: print this help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' | sed -e 's/^/ /'

## run/api: start the web server
.PHONY: run/api
run/api:
	go run ./back/cmd/api

## run/term: start the terminology server
.PHONY: run/terminology
run/terminology:
	go run ./back/cmd/terminology

## audit: tidy dependencies and format, vet and test all code
.PHONY: audit
audit:
	@echo 'Tidying and verifying module dependencies...' go mod tidy
	go mod verify
	@echo 'Formatting code...'
	go fmt ./...
	@echo 'Vetting code...'
	go vet ./...
	staticcheck ./...
	@echo 'Running tests...'
	go test -race -vet=off ./...

## docker/up/local: run the local docker compose application
.PHONY: docker/local
docker/local:
	docker compose \
		-f infrastructure/docker/compose/docker-compose.base.yml \
		-f infrastructure/docker/compose/docker-compose.local.yml \
		up --build

## docker/up/production: run the production docker compose application
.PHONY: docker/production
docker/production:
	docker compose \
		-f infrastructure/docker/compose/docker-compose.base.yml \
		-f infrastructure/docker/compose/docker-compose.prod.yml \
		up --build -d
