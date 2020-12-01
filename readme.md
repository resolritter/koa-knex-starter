# Introduction

This project's initial code comes from
[koa-knex-realworld-example](https://github.com/gothinkster/koa-knex-realworld-example),
although it ended up being almost entirely refactored and some parts were removed due to
messy module nuances and poor code quality.

This repository is meant to be a barebones project which lays out the foundations for building a real application.
Instead of having the full "real-world" use-case as in the aforementioned project, it only includes the `login`
and `user` controllers because that's commonplace for most applications; it also helps to shed some light
in how the module structure is organized.

# Features

## Implemented

- User endpoint and resource
- Database integration
- Authentication endpoint leveraging JWT
- Integration tests
- Error-handling middleware
- Logging capabilities
- Linters and formatters all configured
- Pre-commit hooks infrastructure

## TODO

- Have API errors also be tested (e.g. if a field is missing, check if the error message correctly informs it)

# Running

The database is set to `sqlite3` as default, thus you won't need any external
services in order to run the app.

## Setting up the datbase

`npm run db:setup` does everything needed to start from a clean slate. It's a
combination of multiple other database commands (check
[package.json](./package.json) for them).

## Server

- `npm start` will run the server in a production environment
- `npm dev` will run the server in development environment

# Environment configuration

Refer to [dotenv](https://www.npmjs.com/package/dotenv)'s docs. By default, the
environment will be loaded by **dotenv** and its missing defaults are set in
[setup.js](./src/setup.js).
