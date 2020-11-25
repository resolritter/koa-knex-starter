const config = require("config")
const pino = require("pino")
const os = require("os")

module.exports = pino({
  level: config.get("env.logLevel"),
  serializers: {
    req: (req) => {
      return pino.stdSerializers.req(req)
    },
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
    error: pino.stdSerializers.err,
    user: (user) => ({
      id: user._id,
    }),
  },
  base: {
    NODE_ENV: process.env.NODE_ENV,
    environment: config.get("env.environment"),
    version: config.get("env.version"),
    name: config.get("env.name"),
    pid: process.pid,
    hostname: os.hostname(),
  },
  prettifier: require("pino-colada"),
})
