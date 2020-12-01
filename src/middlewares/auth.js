const { AuthenticationError } = require("../error")
const { adminAccessMask } = require("../constants")

module.exports.userAuthMiddleware = function (ctx, next) {
  ctx.assert(ctx.state.user, new AuthenticationError())
  return next()
}

module.exports.adminAuthMiddleware = function (ctx, next) {
  ctx.assert(
    ctx.state.user?.access_mask == adminAccessMask,
    new AuthenticationError(),
  )
  return next()
}
