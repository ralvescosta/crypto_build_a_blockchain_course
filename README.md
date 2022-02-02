# Blockchain

This project was build during the course [Build a Blockchain and Cryptocurrency from Scratch](https://www.udemy.com/course/build-blockchain/). The course provided the application usecases and the domain entities.

## Project Structure

```
|
│   └── src
|       ├── applications
│       │   └── errors
│       │       └── *_error.ts
│       │   └── interfaces
│       │       └── i_*.ts
│       │   └── usecase
│       │       └── _usecase.ts
│       │
│       ├── business
│       │   └── dtos
│       │       └── *_dto.ts
│       │   └── entities
│       │       └── *.ts
│       │   └── usecases
│       │       └── i_*_usecase.ts
│       │
│       ├── infrastructure
│       │   └── adapters
│       │       └── *_adapt.ts
│       │   └── database
│       │       └── migrations
│       │           └── *.js
│       │       └── models
│       │           └── *_model.js
│       │       └── seeders
│       │           └── *_seeder.js
│       │       └── connection.ts
│       │       └── sequelize.js
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
│       │   └── http_response_factory.ts
│       │   └── i_controller_base.ts
│       │   └── i_rotes.ts
│       │   └── router_config.ts
│       │
|       ├── ioc.ts
|       ├── main.ts
|
|
│   └── tests
|       ├── applications
|       ├── business
|       ├── infrastructure
|       ├── interfaces
|       ├── mocks
|       ├── shared
```

## Installation

- Pull

```bash
git pull https://github.com/ralvescosta/node_base_project.git
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

- To run the application in debugger mode press F5
