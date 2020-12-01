require("./setup")

const http = require("http")
const util = require("util")

const stoppable = require("stoppable")
const pEvent = require("p-event")

const logger = require("./logger")
const db = require("./db")
const app = require("./app")

const exitWithUsage = function () {
  console.log("Usage: main.js [port]")
  process.exit(1)
}

const main = async function () {
  let port, server
  if (process.argv[2]) {
    port = parseInt(process.argv[2])
    if (!port) {
      console.error(`Invalid port '${process.argv[2]}' as argument`)
      exitWithUsage()
    }
  } else {
    port = process.env.PORT
  }
  const host = process.env.HOST

  try {
    await db.select(db.raw("1"))
    logger.debug("Database connected. Running migrations...")
    await db.migrate.latest()

    server = stoppable(http.createServer(app.callback()), 7000)
    server.listen(port, host)
    server.stop = util.promisify(server.stop)
    await pEvent(server, "listening")

    console.log(`Server is listening on: ${host}:${port}`)

    await Promise.race([
      ...["SIGINT", "SIGHUP", "SIGTERM"].map((s) =>
        pEvent(process, s, {
          rejectionEvents: ["uncaughtException", "unhandledRejection"],
        }),
      ),
    ])
  } catch (err) {
    process.exitCode = 1
    logger.fatal(err)
  } finally {
    if (server) {
      logger.debug("Close server")
      await server.stop()
      logger.debug("Server closed")
    }

    logger.debug("Close database")
    await db.destroy()
    logger.debug("Database closed")

    setTimeout(() => process.exit(), 10000).unref()
  }
}

main()
