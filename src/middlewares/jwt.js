const koaJwt = require("koa-jwt")

module.exports = koaJwt({
  getToken(ctx) {
    const { authorization } = ctx.headers
    const [mode, token] = authorization?.split(" ") ?? []

    if (mode === "Bearer" || mode === "Token") {
      return token
    }

    return null
  },
  secret: process.env.SECRET,
  passthrough: true,
  key: "jwt",
})
