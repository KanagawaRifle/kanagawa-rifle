.PHONY: setup env deps dev up down doctor check qa e2e lint-infra
setup: env deps doctor

env:
	@test -f packages/website/.env.local || cp packages/website/.env.example packages/website/.env.local
	@test -f docker/.env || cp docker/.env.example docker/.env

deps:
	npm ci

dev:
	npm run dev

up: env
	LOCAL_UID=$$(id -u) LOCAL_GID=$$(id -g) docker compose --project-directory docker -f docker/docker-compose.yml up -d --build node https-portal

down:
	docker compose --project-directory docker -f docker/docker-compose.yml down

doctor:
	npm run doctor

check:
	npm run check

qa:
	npm run qa

e2e:
	LHCI=1 npm run -w @acme/website test:e2e -- --project=chromium --project="Mobile Chrome"

lint-infra:
	npm run lint:infra
