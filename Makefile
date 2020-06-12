help: ## Display help
	@awk -F ':|##' \
		'/^[^\t].+?:.*?##/ {\
			printf "\033[36m%-30s\033[0m %s\n", $$1, $$NF \
}' $(MAKEFILE_LIST) | sort

update_yarn: ## update yarn packages
	yarn install --check-files

run_local: ## run the rails server locally
	rails s

routes: ## show available rails routes
	rails routes

build: ## build the docker image
	docker-compose build

build_run: ## build and run the application using docker-compose
	docker-compose up --build

up: ## run the application using docker-compose
	docker-compose up
