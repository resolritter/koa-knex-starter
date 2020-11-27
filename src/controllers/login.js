const { omit } = require("lodash")

const db = require("../db")
const { ValidationError } = require("../error")
const { withJWT, comparePassword } = require("../auth")

module.exports.POST = async function (ctx) {
  const { body } = ctx.request

  for (const field of ["email", "password"]) {
    ctx.assert(
      body[field],
      400,
      new ValidationError(["malformed request"], "", `missing ${field}`),
    )
  }

  const user = await db("users").first().where({ email: body.email })

  ctx.assert(user, 404, new ValidationError(["is invalid"], "", "email"))

  ctx.assert(
    await comparePassword(body.password, user.password),
    422,
    new ValidationError(["is invalid"], "", "password"),
  )

  ctx.body = omit(withJWT(user), ["password"])
}
