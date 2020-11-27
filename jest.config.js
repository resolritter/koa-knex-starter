const path = require("path")

const conf = {}

switch (process.env.NODE_ENV) {
  case "integrationTest": {
    const root = path.resolve("./src/tests/integration")

    conf.roots = [root]
    conf.globalSetup = path.join(root, "./lib/globalSetup")
    conf.globalTeardown = path.join(root, "./lib/globalTeardown")
    break
  }
  default:
    console.error(`Unknown environment '${process.env.NODE_ENV}'`)
    process.exit(1)
    break
}

module.exports = conf
