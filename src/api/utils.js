const Router = require("koa-router")
const { allowedMethods: allowedMethodsRaw } = require("../constants")

const allowedMethods = allowedMethodsRaw.map(function (m) {
  return m.toLowerCase()
})

module.exports.setupRoutes = function ({
  route,
  controller,
  endpointsMiddlewares,
}) {
  const router = new Router()

  for (const httpMethod in controller) {
    if (allowedMethods.includes(httpMethod)) {
      const args = [route, controller[httpMethod]]
      const middleware = endpointsMiddlewares[httpMethod]
      if (middleware) {
        args.splice(1, 0, middleware)
      }
      router[httpMethod](...args)
    } else {
      throw new Error(`Entry for HTTP method '${httpMethod}' was not found`)
    }
  }

  return router.routes
}
