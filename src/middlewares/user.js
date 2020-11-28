const { has } = require("lodash")
const db = require("../db")

module.exports = async (ctx, next) => {
  if (has(ctx, "state.jwt.sub.id")) {
    ctx.state.user = await db("users")
      .first(
        "id",
        "email",
        "username",
        "image",
        "bio",
        "created_at",
        "updated_at",
      )
      .where({ id: ctx.state.jwt.sub.id })
  }

  return next()
}
