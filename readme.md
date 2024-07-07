# Microservices Project

This project consists of three microservices: User Service, Material Service, and Transaction Service. Each service is built with Node.js, Express, and Sequelize, and uses MySQL as the database. The services are containerized using Docker and orchestrated with Docker Compose.

## Services

1. **User Service**

   - Manages user-related operations.
   - Port: 3001

2. **Material Service**

   - Manages material-related operations.
   - Port: 3002

3. **Transaction Service**
   - Manages transaction-related operations.
   - Port: 3003

## Prerequisites

- Docker
- Docker Compose

## Project Structure

```
project-root/
├── material-service/
│   ├── bin/
│   ├── config/
│   │   └── sequelize.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   ├── Dockerfile
├── transaction-service/
│   ├── bin/
│   ├── config/
│   │   └── sequelize.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   ├── Dockerfile
├── user-service/
│   ├── bin/
│   ├── config/
│   │   └── sequelize.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   ├── Dockerfile
├── docker-compose.yml
├── .gitignore
├── README.md
```

## Getting Started

### Clone the Repository

```sh
git clone <repository_url>
cd project-root
```

### Environment Variables

Each service uses environment variables for configuration. The `docker-compose.yml` file sets these variables for each service.

### Build and Run the Services

Ensure Docker and Docker Compose are installed on your machine. Then, run the following command to build and start all services:

```sh
docker-compose up --build
```

This command will build the Docker images for each service and start them, along with the MySQL database.

### Verify Services

After the containers are up and running, you can access the services at the following URLs:

- User Service: `http://localhost:3001/users`
- Material Service: `http://localhost:3002/materials`
- Transaction Service: `http://localhost:3003/transactions`

### Endpoints

#### User Service

- **GET /users**: Get all users
- **POST /users**: Create a new user
- **GET /users/:id**: Get a user by ID
- **PUT /users/:id**: Update a user by ID
- **DELETE /users/:id**: Delete a user by ID

#### Material Service

- **GET /materials**: Get all materials
- **POST /materials**: Create a new material
- **GET /materials/:id**: Get a material by ID
- **PUT /materials/:id**: Update a material by ID
- **DELETE /materials/:id**: Delete a material by ID

#### Transaction Service

- **GET /transactions**: Get all transactions
- **POST /transactions**: Create a new transaction
- **GET /transactions/:id**: Get a transaction by ID
- **PUT /transactions/:id**: Update a transaction by ID
- **DELETE /transactions/:id**: Delete a transaction by ID

### Stopping the Services

To stop the services, run:

```sh
docker-compose down
```

This command stops all running containers and removes them.

### Clean Up

To remove the containers, networks, and volumes created by Docker Compose, run:

```sh
docker-compose down -v
```

## Troubleshooting

### Connection Issues

If you encounter connection issues, ensure that the services are correctly configured to connect to the MySQL database and that the database is up and running. Check the logs for each service:

```sh
docker-compose logs user-service
docker-compose logs material-service
docker-compose logs transaction-service
```

### Logs

To view the logs for any service, use:

```sh
docker-compose logs <service_name>
```

For example:

```sh
docker-compose logs user-service
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
