# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

## Gacha API Endpoints

### Perform Gacha

- **Endpoint**: `POST /api/gacha`
- **Description**: Perform a gacha draw. User can do up to 5 draws per day.
- **Request Body**:
  ```json
  {
    "userId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "prize": "Emas 10 gram" // or "No prize won"
  }
  ```
- **Error**: 422 if daily limit exceeded.

### Get Gacha History

- **Endpoint**: `GET /api/gacha/history/:userId`
- **Description**: Get the history of gacha attempts for a user.
- **Response**: Array of attempts with date and prize.

### Get Prizes Status

- **Endpoint**: `GET /api/gacha/prizes`
- **Description**: Get the list of prizes and remaining quota.
- **Response**: Array of prizes with name and remainingQuota.

### Get Winners

- **Endpoint**: `GET /api/gacha/winners`
- **Description**: Get the list of winners for each prize, with masked names.
- **Response**: Object with prize names as keys and array of masked names as values.
