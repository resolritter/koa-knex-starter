const koaJwt = require("koa-jwt")

module.exports = koaJwt({
  getToken: require("koa-jwt/lib/resolvers/auth-header"),
  secret: process.env.SECRET,
  passthrough: true,
  key: "jwt",
})
