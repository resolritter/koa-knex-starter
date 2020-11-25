require("./src/setup")

const config = require("config")
const fs = require("fs")

const dbDataDir = "db"

if (config.get("db.client") === "sqlite3") {
  try {
    fs.mkdirSync(dbDataDir)
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err
    }
  }
}

const dbClient = config.get("db.client")
const dbConnection = config.has("db.connection") && config.get("db.connection")

const options = {
  client: dbClient,
  connection: dbConnection || {
    filename: `${dbDataDir}/dev.sqlite3`,
  },
  migrations: {
    directory: "src/migrations",
    tableName: "migrations",
  },
  debug: false,
  seeds: {
    directory: "src/seeders",
  },
  useNullAsDefault: dbClient === "sqlite3",
}

const configs = {
  development: Object.assign({}, options),

  test: Object.assign({}, options, {
    connection: dbConnection || {
      filename: `${dbDataDir}/test.sqlite3`,
    },
  }),

  production: Object.assign({}, options, {
    connection: dbConnection || {
      filename: `${dbDataDir}/prod.sqlite3`,
    },
  }),
}

Object.assign(configs, configs[process.env.NODE_ENV])

module.exports = configs
