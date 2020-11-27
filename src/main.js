require("./setup")

const http = require("http")
const stoppable = require("stoppable")
const pEvent = require("p-event")
const util = require("util")

const logger = require("./logger")
const db = require("./db")
const app = require("./app")

async function main() {
  const host = process.env.HOST
  const port = process.env.PORT
  let server

  try {
    await db.select(db.raw("1"))
    logger.debug("Database connected. Running migrations...")
    await db.migrate.latest()

    server = stoppable(http.createServer(app.callback()), 7000)
    server.listen(port, host)
    server.stop = util.promisify(server.stop)
    await pEvent(server, "listening")

    console.log("READY!")
    logger.debug(`Server is listening on: ${host}:${port}`)

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
