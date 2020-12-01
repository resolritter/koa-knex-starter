const Router = require("koa-router")

const { allowedMethods } = require("./constants")
const { userAuthMiddleware } = require("./middlewares/auth")
const controllers = require("./controllers")

const setupOnRouter = function (
  router,
  controller,
  httpMethod,
  path,
  endpointsMiddlewares,
) {
  const args = [path, controller[httpMethod]]
  const middleware = endpointsMiddlewares[httpMethod]
  if (middleware) {
    args.splice(1, 0, middleware)
  }
  router[httpMethod.toLowerCase()](...args)
}

const getEndpointRouter = function ({
  root,
  controller,
  fixedPath,
  endpointsMiddlewares = {},
  idParam = "id",
}) {
  const router = new Router()

  for (const httpMethod of allowedMethods) {
    if (!(httpMethod in controller)) {
      continue
    }

    setupOnRouter(
      router,
      controller,
      httpMethod,
      fixedPath ??
        (httpMethod === "POST"
          ? root
          : httpMethod === "PUT"
          ? `${root}/:${idParam}/edit`
          : httpMethod === "DELETE"
          ? `${root}/:${idParam}/delete`
          : `${root}/:${idParam}`),
      endpointsMiddlewares,
    )
  }

  if (controller.LIST) {
    setupOnRouter(router, { GET: controller.LIST }, "GET", `${root}s`, {
      GET: endpointsMiddlewares["LIST"],
    })
  }

  return router.routes()
}

const apiRouter = new Router()

apiRouter.use(
  getEndpointRouter({
    root: "/user",
    controller: controllers.user,
    endpointsMiddlewares: {
      GET: userAuthMiddleware,
      PUT: userAuthMiddleware,
    },
  }),
)

apiRouter.use(
  getEndpointRouter({
    root: "/login",
    controller: controllers.login,
  }),
)

const appRouter = new Router()
appRouter.use("/api", apiRouter.routes())

module.exports = appRouter
