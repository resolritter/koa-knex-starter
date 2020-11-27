# Introduction

This project was started from [koa-knex-realworld-example](https://github.com/gothinkster/koa-knex-realworld-example), although it ended up being almost entirely refactored due to messy module nuances and poor code quality.

# Running

The database is set to `sqlite3` as default, thus you won't need any external
services in order to run the app.

## Seeding

If you'd like to seed the database before your first run, use the following commands

```
npm run db:migrate
npm run db:seed
```

## Server

- `npm start` will run the server in a production environment
- `npm dev` will run the server in development environment

# Environment configuration (optional)

Refer to [dotenv](https://www.npmjs.com/package/dotenv)'s docs
