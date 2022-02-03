# Blockchain

This project was build during the course [Build a Blockchain and Cryptocurrency from Scratch](https://www.udemy.com/course/build-blockchain/). The course provided the application usecases and the domain entities.

## Project Structure

```
|
│   └── src
|       ├── application
│       │   └── errors
│       │       └── *_error.ts
│       │   └── interfaces
│       │       └── i_*.ts
│       │   └── usecases
│       │       └── _usecase.ts
│       │
│       ├── domain
│       │   └── entities
│       │       └── *.ts
│       │   └── usecases
│       │       └── i_*_usecase.ts
│       │
│       ├── infra
│       │   └── adapters
│       │       └── *_adapt.ts
│       │   └── database
│       │       └── *.js
│       │   └── environments
│       │       └── *.ts
│       │   └── http_server
│       │       └── *.ts
│       │   └── repositories
│       │       └── *_repository.ts
│       │   └── folder
│       │       └── *.ts
|       |
│       ├── interfaces
│       │   └── http
|       |       └── controllers
│       │           └── *_controller.ts
|       |       └── middleware
│       │           └── *_middleware.ts
|       |       └── presenters
│       │           └── *_routes.ts
│       │
|       ├── shared
│       │   └── base_error.ts
│       │   └── either.ts
│       │
|       ├── ioc.ts
|       ├── main.ts
|
|
│   └── tests
|       ├── application
|       ├── domain
|       ├── infra
|       ├── interfaces
|       └── shared
└───────
```

## Installation

- Pull

```bash
git pull https://github.com/ralvescosta/crypto_build_a_blockchain_course
```

- Get Pkg's

```bash
yarn install
```

- To configure the Environment to run the application

```bash
docker-compose -f docker-compose.environments.yml up -d
```

- To run the application with nodemon

```bash
yarn start:dev
```

- To run the application in debugger mode just press F5
