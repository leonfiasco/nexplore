### Nexplore

Getting Started

Create a database called

```sh
createdb nexploretodo
```

Configure database connection

```sh
// db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'theirusername',
  password: 'theirpassword',
  host: 'localhost',
  port: 5432,
  database: 'nexploretodo',
});

export default pool;
```

Backend
Navigate to the server folder:

Install the required packages:

```sh
cd server

```

Install dependencies

```sh
yarn
```

To start the server

```sh
yarn start
```

Frontend

Navigate out of server folder:

```sh
cd ..
```

Navigate to the client folder:

```sh
cd client

```

Install dependencies

```sh
yarn
```

Run project locally

```sh
yarn run dev
```

## Project Structure

The project is organized into two main components:

For the purpose of being able to create a database I've left the db info visible but in a production app i would store these values in a .env file

server: Contains the backend code.
client: Contains the frontend code.

Technologies Used
Backend:

- Node.js
- Typescript
- Express.js
- Postgres

Frontend:

- React
- Typescript
