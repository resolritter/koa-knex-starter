const { setupRoutes } = require("./utils")

module.exports = setupRoutes({
  route: "/login",
  controller: require("../controllers/login"),
})
