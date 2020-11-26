require("./src/setup")

const config = require("config")
const fs = require("fs")

const dbDataDir = "db"
const dbClient = config.get("db.client")

if (dbClient === "sqlite3") {
  try {
    fs.mkdirSync(dbDataDir)
  } catch (err) {
    if (err.code !== "EEXIST") {
      throw err
    }
  }
}

module.exports = {
  client: dbClient,
  connection: {
    filename: `${dbDataDir}/${config.get("db.name") ?? "dev"}.sqlite3`,
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
