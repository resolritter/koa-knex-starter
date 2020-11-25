const _ = require("lodash")

const db = require("../db")
const { ValidationError } = require("../error")
const { withJWT, comparePassword } = require("../auth")

module.exports.post = async function (ctx) {
  const {
    body: { user: payload },
  } = ctx.request

  for (const field of ["email", "password"]) {
    ctx.assert(
      payload[field],
      400,
      new ValidationError(["malformed request"], "", `missing ${field}`),
    )
  }

  const user = await db("users").first().where({ email: payload.email })

  ctx.assert(user, 404, new ValidationError(["is invalid"], "", "email"))

  ctx.assert(
    await comparePassword(payload.password, user.password),
    422,
    new ValidationError(["is invalid"], "", "password"),
  )

  ctx.body = { user: _.omit(withJWT(user), ["password"]) }
}
