const { AuthenticationError } = require("../error")

module.exports = function (ctx, next) {
  ctx.assert(ctx.state.user, new AuthenticationError())
  return next()
}
