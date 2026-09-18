# Owner and Pet Management API

A NestJS REST API for managing owners and their pets. The application uses TypeORM with MySQL, request validation, Swagger documentation, and bcrypt password hashing.

## Installation

Requirements:

- Node.js 20 or later
- npm
- Docker Desktop (recommended for the MySQL database)

Install dependencies:

```bash
npm install -g @nestjs/cli
nest new my-nest-app
cd my-nest-app
npm run start-dev
```

## Environment Variables

The application reads the following variables. The values shown are the defaults used when a variable is not set:

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3000` | HTTP port for the NestJS application |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_PORT` | `3306` | MySQL port |
| `DB_USERNAME` | `root` | MySQL username |
| `DB_PASSWORD` | `root` | MySQL password |
| `DB_NAME` | `my_nest_app` | MySQL database name |

There is no dotenv configuration in this project. Set variables in the shell before starting the application. For example, in PowerShell:

```powershell
$env:DB_HOST = "localhost"
$env:DB_PORT = "3306"
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "root"
$env:DB_NAME = "my_nest_app"
$env:PORT = "3000"
```

## Database Setup

Start the MySQL 8 container defined in `docker-compose.yml`:

```bash
docker compose up -d
```

The container creates database `my_nest_app` with user `root` and password `root`, and exposes MySQL on port `3306`.

Run the TypeORM migrations after the database is ready:

```bash
npm run migration:run
```

The application uses migrations and has TypeORM `synchronize` disabled. Do not rely on automatic schema synchronization.

To check that the database container is running:

```bash
docker ps
```

## Running the Project

Development mode:

```bash
npm run start:dev
```

The API is then available at `http://localhost:3000`.

Other available commands:

```bash
npm run start       # start normally
npm run build       # compile the project
npm run start:prod  # run the compiled application
npm run test        # run unit tests
npm run test:e2e    # run end-to-end tests
```

## Swagger

Open the Swagger UI at:

`http://localhost:3000/api`

## Sample cURL Requests

Create an owner:

```bash
curl -X POST http://localhost:3000/owners \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

List owners:

```bash
curl http://localhost:3000/owners
```

Get one owner:

```bash
curl http://localhost:3000/owners/1
```

Create a pet for owner `1`:

```bash
curl -X POST http://localhost:3000/pets \
  -H "Content-Type: application/json" \
  -d '{"name":"Buddy","type":"Dog","ownerId":1}'
```

Update a pet:

```bash
curl -X PATCH http://localhost:3000/pets/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Buddy Jr."}'
```

Delete an owner:

```bash
curl -X DELETE http://localhost:3000/owners/1
```

## Password Hashing

Authentication is **not included** in this exercise. Owner passwords are nevertheless securely hashed with bcrypt before they are stored. The service uses a cost factor of `10`, and password fields are excluded from normal owner queries and API responses. Plain-text passwords are never returned by the API.

## Owner Deletion Behavior

Deleting an owner also deletes all pets belonging to that owner. This is enforced by the database relationship with `onDelete: 'CASCADE'` on the pet-to-owner foreign key.

## Notes and Assumptions

- Authentication and authorization are intentionally out of scope. The API does not require login or tokens.
- Owner email addresses are unique.
- Pet types are unique in the current schema.
- A pet must reference an existing owner.
- Request bodies are validated, unknown properties are rejected, and route IDs must be integers.
- The default database credentials are intended for local development only and must be changed for a deployed environment.
- The global exception filter formats HTTP errors and unexpected errors into JSON responses.
