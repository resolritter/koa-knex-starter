const Router = require("koa-router")
const router = new Router()

const api = new Router()
for (const apiRoute of ["user", "login"].map(function (route) {
  return require(`./api/${route}`)
})) {
  api.use(apiRoute)
}

router.use("/api", api.routes())

module.exports = router
