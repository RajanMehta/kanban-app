# Kanban Task Board

A full-stack Kanban board for managing tasks across **To Do → In Progress → Done**, with
create, edit, delete, and drag-and-drop between columns.

- **Backend:** .NET 10 Web API, EF Core, SQLite
- **Frontend:** React + TypeScript (Vite)
- **Containerization:** Docker + docker-compose

## Quick start (Docker)

The fastest way to try the app. No local .NET or Node needed, just
[Git](https://git-scm.com/) and [Docker](https://www.docker.com/):

```bash
git clone <your-repo-url> kanban-app
cd kanban-app
make docker-build   # build the backend and frontend images
make docker-up      # start both services in the background
```

- **App:** http://localhost:3000
- **API:** http://localhost:5050

The backend applies its database migrations on startup and persists SQLite data in a
named Docker volume (`kanban-data`), so tasks survive restarts. Tail logs with
`make docker-logs`, and stop everything with `make docker-down`.

## Local development

To run the services directly on your machine (with hot reload), you'll need:

- [Git](https://git-scm.com/)
- [.NET SDK 10+](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/) (LTS recommended). If you use
  [nvm](https://github.com/nvm-sh/nvm), the frontend ships an `.nvmrc` so `nvm use` picks
  the right version.

This repo uses a `Makefile` as the command runner. Run **`make help`** at any time to see
all available targets.

### 1. Backend API

From the repo root:

```bash
make build       # restore packages and compile
make ef-tools    # one-time: install the local dotnet-ef CLI
make db-update   # create the SQLite database from migrations
make run         # start the API on http://localhost:5050
```

The API is now serving at **http://localhost:5050**.

### 2. Frontend

In a second terminal:

```bash
cd frontend
nvm use          # selects the Node version from .nvmrc (skip if not using nvm)
npm install      # first run only
npm run dev      # start the dev server on http://localhost:5173
```

Open **http://localhost:5173**. Both servers need to be running together; the backend's
CORS policy already allows the Vite origin (`http://localhost:5173`).

> The same frontend tasks are wrapped as `make` targets (`make fe-dev`, `make fe-build`,
> `make fe-lint`). Run them from the repo root once the right Node version is active.

## API reference

- **Base URL:** `http://localhost:5050`
- **Endpoints:** `GET/POST/PUT/DELETE /api/tasks`

For the full request/response shapes, explore the interactive **Swagger UI** at
**http://localhost:5050/swagger** (Development only), or import the Postman collection at
[`postman/Kanban.postman_collection.json`](postman/Kanban.postman_collection.json).

## Configuration

- **Frontend → API URL:** set `VITE_API_BASE_URL` in `frontend/.env` (defaults to
  `http://localhost:5050`). Copy `frontend/.env.example` to `frontend/.env` to customize.
- **Allowed CORS origins:** `Cors:AllowedOrigins` in `backend/Kanban.Api/appsettings.json`.

## Project structure

```
kanban-app/
├── Makefile                # command runner (run `make help`)
├── postman/                # Postman collection for API verification
├── backend/
│   └── Kanban.Api/
│       ├── Controllers/    # REST endpoints
│       ├── Services/       # business logic
│       ├── Data/           # EF Core DbContext
│       ├── Models/         # entities + Status enum
│       ├── Dtos/           # request/response contracts
│       └── Migrations/     # EF Core schema history
└── frontend/
    └── src/
        ├── api/            # typed fetch client
        ├── state/          # Context + reducer (state management)
        ├── components/     # Board, Column, Card, forms
        └── types/          # shared TypeScript types
```
