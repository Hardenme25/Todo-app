# Todo-app

A Dockerized backend application built with **Node.js**, **Express**, **PostgreSQL**, and **Prisma ORM**. The project provides a REST API with authentication and database management using Prisma.

---

## Features

- Express.js REST API
- PostgreSQL database
- Prisma ORM for database access
- JWT Authentication
- Password hashing with bcrypt
- Environment variable support using dotenv
- Development server with Nodemon
- ES Modules support

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT (JSON Web Tokens)
- bcrypt
- dotenv
- Nodemon
- Docker

---

## Project Structure

```
project_1/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Move into the project directory.

```bash
cd project_1
```

Install dependencies.

```bash
npm install
```

---

## Database Setup

Generate the Prisma client.

```bash
npx prisma generate
```

Run database migrations.

```bash
npx prisma migrate dev
```

## Running the Application

Start the development server.

```bash
npm run dev
```

The server will start on

```
http://localhost:3000
```

---

## Available Scripts

| Script | Description |
|---------|-------------|
| npm run dev | Starts the development server using Nodemon |

---

## API

Example endpoints:

```
POST /register
POST /login
GET /users
PUT /users/:id
DELETE /users/:id
```

Update these endpoints to match your project.

---

##  Authentication

Authentication uses **JSON Web Tokens (JWT)**.

After logging in, include the token in your request headers.

```
Authorization: Bearer <token>
```

---

## Dependencies

### Production

- Express
- Prisma Client
- PostgreSQL Driver (pg)
- bcrypt
- jsonwebtoken

### Development

- Nodemon
- dotenv

---

## Docker

If using Docker:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```

---

## Author

Kayongo Emmanuel

---

## License

ISC
