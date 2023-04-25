# RepairNow Monorepo

This repository is based on an official Docker starter Turborepo.

Changed NextJS front app by the vueJS app provided by Antoine Pollet config

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

## Apps and Packages

#### APPS

- `front`: a vueJS app boiler plate created by Antoine
- `back/api-gateway`: API Gateway (Nest.js)
- `back/auth`: Auth microservice (Nest.js)

#### Packages (shared between apps)

- `ui`: ui: a React component library (TODO: not usefull for the moment, maybe we can replace it by a vuejs lib?)
- `eslint-config-custom-server`: `eslint` configurations for server side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `scripts`: Jest configurations
- `logger`: Isomorphic logger (a small wrapper around console.log)
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

<!-- ### For DEV only

run `yarn install && yarn run dev` => this will start all services provided by this monorepo

Have a look to `localhost:5173` to see your front app and `locahost:3001` for API (it can be changed) -->

### Run project - DEV

To run all projects in DEV environment inside docker containers:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network
# start all projects
docker compose up
```

<!-- ### Docker - PROD

This repo is configured to be built with Docker, and Docker compose. To build all apps in this repo:

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d

# To see logs on a detached docker compose
docker-compose logs -f
```

Open http://localhost:80 to see your front working with all others services.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Remote Caching

This example includes optional remote caching. In the Dockerfiles of the apps, uncomment the build arguments for `TURBO_TEAM` and `TURBO_TOKEN`. Then, pass these build arguments to your Docker build.

You can test this behavior using a command like:

`docker build -f apps/front/Dockerfile . --build-arg TURBO_TEAM=“your-team-name” --build-arg TURBO_TOKEN=“your-token“ --no-cache` -->

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
