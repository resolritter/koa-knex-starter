const Router = require("koa-router")
const assert = require("assert")

const { allowedMethods } = require("./constants")
const authMiddleware = require("./middlewares/auth")

const getEndpointRouter = function ({
  path,
  controller,
  endpointsMiddlewares = {},
}) {
  const router = new Router()

  for (const httpMethod in controller) {
    assert.ok(allowedMethods.includes(httpMethod))

    const args = [path, controller[httpMethod]]
    const middleware = endpointsMiddlewares[httpMethod]
    if (middleware) {
      args.splice(1, 0, middleware)
    }
    router[httpMethod.toLowerCase()](...args)
  }

  return router.routes()
}

const apiRouter = new Router()

apiRouter.use(
  getEndpointRouter({
    path: "/user",
    controller: require("./controllers/user"),
    endpointsMiddlewares: {
      GET: authMiddleware,
      PUT: authMiddleware,
    },
  }),
)

apiRouter.use(
  getEndpointRouter({
    path: "/login",
    controller: require("./controllers/login"),
  }),
)

const appRouter = new Router()
appRouter.use("/api", apiRouter.routes())

module.exports = appRouter
