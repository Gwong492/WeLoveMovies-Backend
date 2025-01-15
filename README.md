# Movie Database API

A Node.js and Express backend application leveraging Knex.js and a PostgreSQL database to manage data for a movie database. This application serves as a RESTful API with routes for movies, theaters, and reviews.

## Features

- **Movies**: Retrieve a list of movies, details for a specific movie, associated theaters, and reviews.
- **Theaters**: Get a list of all theaters.
- **Reviews**: Update or delete reviews for movies.
- **Error Handling**: Handles `404` for non-existent routes and `405` for unsupported HTTP methods.
- **CORS**: Configured to allow frontend requests.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **ORM**: Knex.js
- **Middleware**: cors

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd movie-database-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:

   - Create the required database.
   - Update the `knexfile.js` with your database configuration.

4. Run the database migrations:

   ```bash
   npx knex migrate:latest
   ```

5. Seed the database:

   ```bash
   npx knex seed:run
   ```

6. Start the server:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:3000` by default.

## API Endpoints

### Movies

Base URL: `/movies`

- **GET** `/movies`: Retrieve a list of all movies.
- **GET** `/movies/:movieId`: Get details of a specific movie by ID.
- **GET** `/movies/:movieId/theaters`: Get a list of theaters showing the specified movie.
- **GET** `/movies/:movieId/reviews`: Get reviews for the specified movie.

### Theaters

Base URL: `/theaters`

- **GET** `/theaters`: Retrieve a list of all theaters.

### Reviews

Base URL: `/reviews`

- **DELETE** `/reviews/:reviewId`: Delete a review by ID.
- **PUT** `/reviews/:reviewId`: Update a review by ID.

## Error Handling

- **404 Not Found**: Returned when a non-existent route is accessed.
- **405 Method Not Allowed**: Returned when an unsupported HTTP method is used on an existing route.

## Middleware

- **CORS**: Ensures the frontend can communicate with the API.
- **methodNotAllowed**: Middleware to handle unsupported HTTP methods.

