const { omit } = require("lodash")

const db = require("../db")
const { withJWT, hashPassword } = require("../auth")
const { putValidator, postValidator } = require("../validators/user")
const { usersTable } = require("../constants")

module.exports.GET = async function (ctx) {
  ctx.body = ctx.state.user
  ctx.response.status = 200
}

module.exports.POST = async function (ctx) {
  const { body: user } = ctx.request

  await postValidator.validate(user, {
    abortEarly: false,
    context: { validatePassword: true },
  })

  user.password = await hashPassword(user.password)

  await db(usersTable).insert(user)

  ctx.body = omit(withJWT(user), ["password"])
  ctx.response.status = 201
}

module.exports.PUT = async function (ctx) {
  const { body } = ctx.request

  const user = Object.assign({}, ctx.state.user, body)

  if (body.password) {
    user.password = await hashPassword(body.password)
  }

  user.updated_at = new Date().toISOString()

  await putValidator.validate(user, {
    abortEarly: false,
    context: { validatePassword: !!body.password },
  })

  await db(usersTable).where({ id: user.id }).update(user)

  ctx.body = omit(withJWT(user), ["password"])
  ctx.response.status = 200
}
