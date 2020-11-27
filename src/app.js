const Koa = require("koa")
const responseTime = require("koa-response-time")
const helmet = require("koa-helmet")
const logger = require("koa-logger")
const xRequestId = require("koa-x-request-id")
const cors = require("kcors")
const bodyParser = require("koa-bodyparser")

const jwtMiddleware = require("./middlewares/jwt")
const pagerMiddleware = require("./middlewares/pager")
const userMiddleware = require("./middlewares/user")
const errorMiddleware = require("./middlewares/user")
const { allowedMethods } = require("./constants")

const app = new Koa()
app.proxy = true

app.use(responseTime())

app.use(xRequestId({ inject: true }, app))

app.use(logger())

app.use(helmet())

app.use(
  cors({
    origin: "*",
    exposeHeaders: ["Authorization"],
    credentials: true,
    allowMethods: allowedMethods,
    allowHeaders: ["Authorization", "Content-Type"],
    keepHeadersOnError: true,
  }),
)

app.use(jwtMiddleware)
app.use(
  bodyParser({
    enableTypes: ["json"],
  }),
)
app.use(errorMiddleware)
app.use(userMiddleware)
app.use(pagerMiddleware)

const router = require("./router")
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
