#  Run `make` (or `make help`) to see every available target.

# Paths
BACKEND  := backend
API      := backend/Kanban.Api/Kanban.Api.csproj
FRONTEND := frontend

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

# Database (EF Core migrations)
.PHONY: ef-tools migrate db-update db-reset
ef-tools: ## Install the local dotnet-ef CLI tool (one-time)
	cd $(BACKEND) && dotnet new tool-manifest --force && dotnet tool install dotnet-ef

migrate: ## Create a migration: make migrate NAME=AddSomething
	cd $(BACKEND) && dotnet ef migrations add $(NAME) --project Kanban.Api

db-update: ## Apply pending migrations to the SQLite database
	cd $(BACKEND) && dotnet ef database update --project Kanban.Api

db-reset: ## Delete the local SQLite db and re-apply migrations
	rm -f $(BACKEND)/Kanban.Api/kanban.db
	$(MAKE) db-update

# Frontend (React + TypeScript via Vite)
# Note: requires the LTS Node active in your shell first (cd frontend && nvm use).
.PHONY: fe-install fe-dev fe-build fe-lint fe-preview
fe-install: ## Install frontend dependencies (npm install)
	cd $(FRONTEND) && npm install

fe-dev: ## Start the Vite dev server on http://localhost:5173
	cd $(FRONTEND) && npm run dev

fe-build: ## Type-check and build the production bundle
	cd $(FRONTEND) && npm run build

fe-lint: ## Lint the frontend with ESLint
	cd $(FRONTEND) && npm run lint

fe-preview: ## Preview the production build locally
	cd $(FRONTEND) && npm run preview
