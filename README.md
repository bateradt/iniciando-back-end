<h1 align="center">Welcome to Back-end GoBarber 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/bateradt" target="_blank">
    <img alt="Twitter: bateradt" src="https://img.shields.io/twitter/follow/bateradt.svg?style=social" />
  </a>
</p>

> Back-end do aplicativo GoBarber, onde o objetivo é ligar os barbeiros aos clientes através de uma plataforma web e mobile.

Para executar este projeto, você precisa ter os pacotes instalados em seu micro:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://legacy.yarnpkg.com/en/)

# :pushpin: Back-end

- API criada com Node.js e Typescript

- Banco de dados é o Postgres com o framework TypeOrm do Node.js para manipular os dados

## ⚡️

- Para rodar está API eu recomendo você utilizar o docker com o PostgresSQL 12.0, segue instalador[Docker] (https://www.docker.com/)

### Rodando Postgres com DOCKER: 🐋

 - [Dockerhub] (https://hub.docker.com/_/postgres)

```
$ docker run --name some-postgres -p 5432:5432 -e POSTGRES_PASSWORD=suasenha -d postgres
```

#### Para iniciar um contêiner do Postgres já instalado, execute:

```
$ docker start "NOME DO CONTAINER"
```

### Configurando o ormconfig.json

```
Abra o arquivo "ormconfig.json" que está na raiz do projeto e configure o Host, User, Password e Database com os parâmetros que você definiu na criação do contêiner do Postgres.
```

### Em um novo Terminal acesse a pasta do projeto e execute:

## Install

```sh
yarn
```

## Rodar as migrations e o back-end

```sh
$ yarn typeorm migration:run

$ yarn dev:server
```

## Run tests

```sh
yarn test
```

## Author

👤 **Marcelo Fernando Scarpim**

* Website: https://github.com/bateradt
* Twitter: [@bateradt](https://twitter.com/bateradt)
* Github: [@bateradt](https://github.com/bateradt)
* LinkedIn: [@marcelo-fernando-scarpim](https://linkedin.com/in/marcelo-fernando-scarpim)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
