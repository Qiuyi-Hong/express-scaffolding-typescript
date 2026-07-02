<p align="center">
 <img src="https://raw.githubusercontent.com/Qiuyi-Hong/express-scaffolding-typescript/main/express-typescript.svg" alt="Express Scaffolding TypeScript" width="100%" />
</p>

# express-scaffolding-typescript

[![npm version](https://img.shields.io/npm/v/express-scaffolding-typescript.svg)](https://www.npmjs.com/package/express-scaffolding-typescript)
[![license](https://img.shields.io/npm/l/express-scaffolding-typescript.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-3178C6)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express.js-5.x-20232A)](https://expressjs.com/)

Scaffold a new Express.js backend with TypeScript, ESLint, Prettier, dotenv configuration, and a small CRUD-style starter route. It is designed for quickly creating a clean API project without wiring the same files by hand every time.

## Table of contents

- [Quick start](#quick-start)
- [CLI usage](#cli-usage)
- [What gets generated](#what-gets-generated)
- [Generated project structure](#generated-project-structure)
- [Starter API](#starter-api)
- [Generated scripts](#generated-scripts)
- [Local development](#local-development)
- [License](#license)

## Quick start

Use `npx` to generate a new project:

```sh
npx express-scaffolding-typescript my-app
cd my-app
npm run dev
```

The generated server starts on port `3000` by default. You can override it with a `.env` file:

```sh
PORT=3000
NODE_ENV=development
```

Then open:

```text
http://localhost:3000/items
```

## CLI usage

```sh
npx express-scaffolding-typescript [project-directory]
```

Arguments:

| Argument | Description | Default |
| --- | --- | --- |
| `project-directory` | Folder where the Express TypeScript app will be created. | `express-scaffolding-ts` |

Example:

```sh
npx express-scaffolding-typescript shop-api
```

If the `project-directory` is current directory, simply run:

```sh
npx express-scaffolding-typescript ./
```

The CLI will:

1. Copy the Express TypeScript template into the destination folder.
2. Update the generated `package.json` name to match the destination folder.
3. Rename the template `gitignore` file to `.gitignore`.
4. Install runtime and development dependencies with npm.

This package currently uses one positional argument only. It does not prompt for databases, authentication, package managers, or optional features.

## What gets generated

Every generated project includes:

- Express 5 with TypeScript source files.
- `tsx` watch mode for local development.
- `dotenv` configuration with `PORT` and `NODE_ENV` support.
- JSON request parsing via `body-parser`.
- Static file serving from `public`.
- Permissive CORS headers suitable for a starter API.
- A sample `/items` resource with create, read, update, and delete handlers.
- A global Express error handler.
- ESLint and Prettier configuration.

## Generated project structure

```text
my-app/
|-- src/  
|   |-- config/
|   |   |-- config.ts
|   |-- controllers/
|   |   |-- itemController.ts
|   |-- middlewares/
|   |   |-- errorHandler.ts
|   |-- models/
|   |   |-- item.ts
|   |-- public/
|   |-- routes/
|   |   |-- itemRoutes.ts
|   |-- utils/
|   |-- views/
|   |-- app.ts
|   |-- server.ts
|-- .env
|-- .gitignore
|-- eslint.config.mjs
|-- package.json
|-- tsconfig.json
```

Key files:

| File | Purpose |
| --- | --- |
| `src/server.ts` | Starts the Express server using the configured port. |
| `src/app.ts` | Configures middleware, static files, routes, and the error handler. |
| `src/config/config.ts` | Loads environment variables and exposes app configuration. |
| `src/routes/itemRoutes.ts` | Defines the sample `/items` routes. |
| `src/controllers/itemController.ts` | Implements the sample in-memory CRUD handlers. |
| `src/models/item.ts` | Defines the sample `Item` type and in-memory store. |
| `src/middlewares/errorHandler.ts` | Returns JSON error responses for unhandled route errors. |

## Starter API

The template includes an in-memory `items` resource. Data is reset whenever the server restarts.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/items` | List all items. |
| `POST` | `/items` | Create an item with a JSON body such as `{ "name": "Notebook" }`. |
| `GET` | `/items/:id` | Fetch one item by id. |
| `PUT` | `/items/:id` | Update an item's `name`. |
| `DELETE` | `/items/:id` | Delete one item by id. |

Example request:

```sh
curl -X POST http://localhost:3000/items \
 -H "Content-Type: application/json" \
 -d '{"name":"Notebook"}'
```

## Generated scripts

Inside a generated project, these npm scripts are available:

| Script | Command | Description |
| --- | --- | --- |
| `npm run dev` | `tsx --watch src/server.ts` | Start the server in watch mode. |
| `npm run build` | `tsc` | Run the TypeScript compiler with the generated config. |
| `npm run type-check` | `tsc --noEmit` | Type-check without emitting files. |
| `npm run lint` | `eslint .` | Run ESLint. |
| `npm run lint:fix` | `eslint --fix .` | Apply safe ESLint fixes. |
| `npm run format` | `prettier --write .` | Format files with Prettier. |
| `npm run format:check` | `prettier --check .` | Check formatting. |
| `npm start` | `node dist/server.js` | Run the compiled server output. |

## Local development

To work on this scaffolder itself:

```sh
git clone https://github.com/Qiuyi-Hong/express-scaffolding-typescript.git
cd express-scaffolding-typescript
npm install
```

Run the CLI locally:

```sh
npm run start -- my-app
```

Quality checks:

```sh
npm run lint
npm run test
```

The smoke test packages the CLI, executes the published bin entry, scaffolds a temporary app, and verifies that dependencies are installed.

## License

MIT License. See [LICENSE](LICENSE) for details.
