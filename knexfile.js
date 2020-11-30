require("./src/setup")

const fs = require("fs")

const dbDataDir = "db"
const dbClient = process.env.DB_CLIENT

const defaultConfig = {
  client: dbClient,
  connection: {
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

const customConfigs = {
  integrationTest: {
    client: "sqlite3",
    connection: ":memory:",
    pool: {
      min: 1,
      max: 1,
    },
  },
}

const finalConfig = Object.assign(
  {},
  defaultConfig,
  customConfigs[process.env.NODE_ENV],
)

if (finalConfig.client === "sqlite3") {
  try {
    fs.mkdirSync(dbDataDir)
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err
    }
  }
}

module.exports = finalConfig
