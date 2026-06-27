# Kanban Task Board

A full-stack Kanban board for managing tasks across **To Do → In Progress → Done**.

- **Backend:** .NET 10 Web API, EF Core, SQLite
- **Frontend:** React + TypeScript (Vite) — _in progress_
- **Containerization:** Docker + docker-compose — _planned_

## Project structure

```
kanban-app/
├── Makefile                       # command runner (run `make` to list targets)
├── postman/                       # Postman collection for API verification
├── backend/
│   ├── Kanban.slnx                # solution
│   └── Kanban.Api/
│       ├── Program.cs             # app bootstrap: DI + middleware pipeline
│       ├── Controllers/           # REST endpoints (HTTP layer)
│       ├── Services/              # business logic (ITaskService / TaskService)
│       ├── Data/                  # EF Core DbContext
│       ├── Models/                # entities + Status enum
│       ├── Dtos/                  # request/response contracts + validation
│       ├── Mappings/              # entity <-> DTO mapping
│       └── Migrations/            # EF Core schema history
├── frontend/                      # React + TypeScript app (in progress)
└── docker-compose.yml             # (planned)
```

## Backend

### Prerequisites

- [.NET SDK 10+](https://dotnet.microsoft.com/download)

### Run it

All repetitive commands live in the `Makefile`. Run `make` (or `make help`) to see them.

```bash
make ef-tools     # one-time: install the local dotnet-ef CLI
make db-update    # create the SQLite database from migrations
make run          # start the API on http://localhost:5050
```

For development with hot reload, use `make watch` instead of `make run`.

The SQLite file (`backend/Kanban.Api/kanban.db`) is created locally and is gitignored —
the schema is defined by the committed migrations in `Migrations/`.

### API reference

Base URL: `http://localhost:5050`

| Method | Endpoint          | Description        | Success            | Failure        |
|--------|-------------------|--------------------|--------------------|----------------|
| GET    | `/api/tasks`      | List all tasks     | `200 OK`           | —              |
| GET    | `/api/tasks/{id}` | Get one task       | `200 OK`           | `404 Not Found`|
| POST   | `/api/tasks`      | Create a task      | `201 Created` + `Location` | `400 Bad Request` |
| PUT    | `/api/tasks/{id}` | Update a task      | `200 OK`           | `404` / `400`  |
| DELETE | `/api/tasks/{id}` | Delete a task      | `204 No Content`   | `404 Not Found`|

**Task shape (response):**

```json
{
  "id": 1,
  "title": "Write the README",
  "description": "Document setup steps for backend and frontend",
  "status": "ToDo",
  "createdAt": "2026-06-27T15:10:00Z",
  "updatedAt": "2026-06-27T15:10:00Z"
}
```

- `status` is one of `"ToDo"`, `"InProgress"`, `"Done"` (serialized as strings).
- `title` is required (1–200 chars); `description` is optional (≤ 2000 chars).
- `id`, `createdAt`, and `updatedAt` are server-managed and ignored on input.

### Explore the API (Swagger)

With the API running, open **http://localhost:5050/swagger** for interactive,
auto-generated documentation with a "Try it out" button for every endpoint. (Available in
the Development environment only.)

### Verify the API (Postman)

1. Start the API: `make run`
2. In Postman: **File → Import** and select [`postman/Kanban.postman_collection.json`](postman/Kanban.postman_collection.json).
3. Run the collection top-to-bottom (or via the Collection Runner). It walks the full
   CRUD lifecycle plus the `400` (invalid body) and `404` (missing id) paths, capturing the
   created task's id into a variable so the requests chain automatically.

### CORS

The API only accepts browser requests from origins listed under `Cors:AllowedOrigins` in
`appsettings.json` (default `http://localhost:5173`, the Vite dev server). Add your
frontend's origin there if it changes.

## Make commands

| Command          | Does                                              |
|------------------|---------------------------------------------------|
| `make help`      | List all available targets                         |
| `make restore`   | Restore NuGet packages                             |
| `make build`     | Compile the backend                                |
| `make run`       | Start the API on http://localhost:5050            |
| `make watch`     | Run the API with hot reload                        |
| `make test`      | Run backend tests                                  |
| `make ef-tools`  | Install the local dotnet-ef CLI (one-time)        |
| `make migrate NAME=X` | Create an EF Core migration                   |
| `make db-update` | Apply migrations to the SQLite database            |
| `make db-reset`  | Delete the local DB and re-apply migrations        |

## Frontend

_In progress — setup instructions will be added when the React app is scaffolded._
