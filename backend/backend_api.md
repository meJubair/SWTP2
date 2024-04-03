# Express REST server

This backend application is built using TypeScript and Express library.

## File stucture description

### Root level

**`index.ts`**

This file is used to start the server using `app.ts` in `localhost:PORT`. It exports `PORT` from `config.ts`.

**`app.ts`**

This file is the actual Express application. It collects all the routes, middleware and connects to the database.

### /controllers

The controllers folder contains modules responsible for handling incoming HTTP requests, processing data, and sending appropriate responses.

### /utils

The utils folder contains utility modules and helper functions that are used across different parts of the backend application. These modules provide common functionality that can be reused throughout the codebase, promoting code organization and maintainability.