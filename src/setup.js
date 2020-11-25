require("dotenv").config()

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development"
}

require("config")
