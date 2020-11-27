const { has } = require("lodash")
const db = require("../db")

module.exports = async (ctx, next) => {
  if (has(ctx, "state.jwt.sub.id")) {
    ctx.state.user = await db("users")
      .first("id", "email")
      .where({ id: ctx.state.jwt.sub.id })
  }

  return next()
}
