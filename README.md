# [API] Happy
![CircleCI](https://img.shields.io/circleci/build/github/DiegoVictor/happy-api?style=flat-square&logo=circleci)
[![eslint](https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-26.5.3-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/happy-api?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/happy-api)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/DiegoVictor/happy-api/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>
[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Happy&uri=https%3A%2F%2Fraw.githubusercontent.com%2FDiegoVictor%2Fhappy-api%2Fmaster%2FInsomnia_2020-10-18.json)

Responsible for provide data to the [`web`](https://github.com/DiegoVictor/happy-web) and [`mobile`](https://github.com/DiegoVictor/happy-app) front-ends. Permit to register orphanages. The app has validation, also a simple versioning was made.

## Table of Contents
* [Installing](#installing)
  * [Configuring](#configuring)
    * [SQLite](#sqlite)
      * [Migrations](#migrations)
    * [.env](#env)
* [Usage](#usage)
  * [Versioning](#versioning)
  * [Routes](#routes)
    * [Requests](#requests)
* [Running the tests](#running-the-tests)
  * [Coverage report](#coverage-report)

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
The application use just one databases: [SQLite](https://www.sqlite.org/index.html).

### SQLite
Store the orphanages. For more information to how to setup your database see:
* [typeorm](https://typeorm.io/#/using-ormconfig)
> You can find the application's `ormconfig.json` file in the root folder.

#### Migrations
Remember to run the database migrations:
```
$ yarn ts-node-dev ./node_modules/typeorm/cli.js migration:run
```
Or:
```
$ yarn typeorm migration:run
```
> See more information on [TypeORM Migrations](https://typeorm.io/#/migrations).

### .env
In this file you may configure your app's port and a url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

|key|description|default
|---|---|---
|APP_PORT|Port number where the app will run.|`3333`
|BASE_URL|App's url.|`http://localhost:3333`

# Usage
To start up the app run:
```
$ yarn dev:server
```
Or:
```
npm run dev:server
```

## Versioning
A simple versioning was made. Just remember to set after the `host` the `/v1/` string to your requests.
```
GET http://localhost:3333/v1/orphanages
```

## Routes
|route|HTTP Method|params|description
|:---|:---:|:---:|:---:
|`/orphanages`|GET| - |Lists orphanages.
|`/orphanages/:id`|GET|`:id` of the orphanage.|Return one orphanage.
|`/orphanages`|POST|Body with new orphanage [form data](https://developer.mozilla.org/docs/Web/API/FormData) (See insomnia file for good example).|Create a new orphanage.

### Requests
* `POST /orphanages`

Request body:
```multipart
{
  "name": "Hackett, Becker and Fadel",
  "latitude": -85.8713,
  "longitude": -73.3957,
  "about": "Adipisci cupiditate illo rerum sunt tempore. Non voluptate laborum enim hic tenetur perspiciatis sint. Quo totam recusandae dolores et ullam commodi. Ut consectetur saepe id voluptatem et quidem. Dolor neque consequuntur ipsa. Placeat sit aut nostrum similique dolorem voluptatem et velit enim.",
  "instructions": "Venha visitar",
  "opening_hours": "Das 8h às 18h",
  "open_on_weekends": true,
  "images": <file(s)>
}
```

# Running the tests
[Jest](https://jestjs.io/) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
