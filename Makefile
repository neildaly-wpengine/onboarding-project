help: ## Display help
	@awk -F ':|##' \
		'/^[^\t].+?:.*?##/ {\
			printf "\033[36m%-30s\033[0m %s\n", $$1, $$NF \
}' $(MAKEFILE_LIST) | sort

update_yarn: ## update yarn packages
	yarn install --check-files

run: ## run the rails server
	rails s

routes: ## show available rails routes
	rails routes
