## Description

My solution to the Wiser back-end challenge using [Nest](https://github.com/nestjs/nest)
with [TypeORM](https://github.com/typeorm/typeorm).

Published at [Heroku](https://wiser-backend-challenge.herokuapp.com/).
The [swagger documentation](https://wiser-backend-challenge.herokuapp.com/docs)
is in the `/docs` path.

## Running locally

First you need to set the environment variables. To do this, you can copy the
`.env.example` and set your environmental values.

```bash
cp .env.example .env
```

Then you can run the application


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

