#  Run `make` (or `make help`) to see every available target.

# Paths
BACKEND := backend
API     := backend/Kanban.Api/Kanban.Api.csproj

# Default migration name; override like: make migrate NAME=AddDueDate
NAME ?= Migration

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help (list of targets)
	@echo "Kanban Task Board — make targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

# Backend (.NET)
.PHONY: restore build run watch test clean
restore: ## Restore NuGet packages (like `pip install -r`)
	dotnet restore $(BACKEND)

build: ## Compile the backend
	dotnet build $(BACKEND)

run: ## Run the API on http://localhost:5050
	dotnet run --project $(API)

watch: ## Run the API with hot reload (like flask --debug)
	dotnet watch --project $(API) run

test: ## Run backend tests
	dotnet test $(BACKEND)

clean: ## Remove build artifacts (bin/ obj/)
	dotnet clean $(BACKEND)
