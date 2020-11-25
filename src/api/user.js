const { setupRoutes } = require("./utils")

const authMiddleware = require("../middlewares/auth")

module.exports = setupRoutes({
  route: "/user",
  controller: require("../controllers/user"),
  endpointsMiddlewares: {
    get: authMiddleware,
    put: authMiddleware,
  },
})
