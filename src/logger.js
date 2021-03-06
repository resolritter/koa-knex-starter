const os = require("os")

const pino = require("pino")

module.exports = pino(
  {
    level: process.env.LOG_LEVEL ?? "info",
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
      environment: process.env.NODE_ENV,
      version: process.env.APP_VERSION,
      name: process.env.APP_NAME,
      pid: process.pid,
      hostname: os.hostname(),
    },
    prettifier: require("pino-colada"),
  },
  //pino.destination("/var/log"),
)
