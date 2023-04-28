# RepairNow Monorepo (Nest.js version)

Ce repo utilise le mode monorepo intégré à Nest.js.

NPM est le gestionnaire de package utilisé dans ce projet.

## Apps et Lib

#### APPS

- `front`: a vueJS app boiler plate created by Antoine
- `back/apps/api-gateway`: API Gateway microservice (Nest.js)
- `back/apps/auth`: Auth microservice (Nest.js)

#### Lib (partagé entre les microservices backend)

Pour partager du code entre les différents microservices backend, créez une librairie interne comme ceci  :
```
# cd back
# nest g library my-library
```

### Run project - DEV

Pour lancer le projet en environnement DEV avec docker :

```
# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network
# start all projects
docker compose up
```