require("dotenv").config()

process.env.NODE_ENV ??= "development"
process.env.HOST ??= "0.0.0.0"
process.env.PORT = process.env.PORT ?? 3000
process.env.APP_VERSION ??= "0.0.1"
process.env.LOG_LEVEL ??= "info"
process.env.SECRET ??= "secret"
process.env.DB_CLIENT = "sqlite3"
