const { omit } = require("lodash")

const db = require("../db")
const { withJWT, hashPassword } = require("../auth")
const validateUser = require("../validators/user")

module.exports.get = async function (ctx) {
  const user = withJWT(ctx.state.user)

  ctx.body = { user }
}

module.exports.post = async function (ctx) {
  const {
    body: { user },
  } = ctx.request
  await validateUser(user, {
    abortEarly: false,
    context: { validatePassword: true },
  })

  ctx.body = { user: omit(withJWT(user), ["password"]) }
}

module.exports.put = async function (ctx) {
  const {
    body: {
      user: { fields },
    },
  } = ctx.request
  const opts = {
    abortEarly: false,
    context: { validatePassword: fields.password },
  }

  const user = Object.assign({}, ctx.state.user, fields)

  if (fields.password) {
    user.password = await hashPassword(user.password)
  }

  user.updatedAt = new Date().toISOString()

  await validateUser(user, opts)

  await db("users").where({ id: user.id }).update(user)

  ctx.body = { user: omit(withJWT(user), ["password"]) }
}
