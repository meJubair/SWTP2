# Express REST server

This backend application is built using TypeScript and the Express library, utilizing ESM syntax for module import/export. It serves as the backend logic for handling HTTP requests and managing data incoming from the front end.

## Features

- Express Server: The application is powered by an Express server, providing robust routing and middleware capabilities for handling HTTP requests.
- TypeScript: TypeScript is used throughout the project, bringing type safety and enhanced developer experience to the codebase.
- Firebase Integration: The application leverages Firebase storage and database services to store user and calendar data securely.
  - Firebase Database: Utilized for storing structured data such as user profiles and calendar data, providing real-time synchronization and offline support.
  - Firebase Storage: Used for storing various media files or binary data associated with user accounts or calendar events.

## File stucture description

### Root level

#### **`index.ts`**

This file is used to start the server using `app.ts` in `localhost:PORT`. It exports `PORT` from `config.ts`.

#### **`app.ts`**

This file is the actual Express application. It collects all the routes, middleware and connects to the database.

### /controllers

The controllers folder contains modules responsible for handling incoming HTTP requests, processing data, and sending appropriate responses.

#### **`calendar.ts`**

Contains all of the endpoints that handle calendar CRUD HTTP requests at [http://localhost:PORT/calendar/api/](http://localhost:PORT/calendar/api).

#### **`auth.ts`**

Contains all the endpoints for handling user authentication related HTTP requests at [http://localhost:PORT/auth/](http://localhost:PORT/auth).

### /utils

The utils folder contains utility modules and helper functions that are used across different parts of the backend application. These modules provide common functionality that can be reused throughout the codebase, promoting code organization and maintainability.

#### **`config.ts`**

This file is used to export environmental variables where they are needed.

### /services

Services folder contains logic for handling Firebase operations. They should imported from here where they are needed (in this case that would mean the contoller-files).

#### **`firebaseService.ts`**

Contains the logic for interacting with the Firebase database.

### /types

#### **`calendarInterface.d.ts`**

Contains interfaces/types for different areas of calendar data.

#### **`calendarDataHelperFunctions.ts`**

Contains different helper functions that promote type safety around the project.
