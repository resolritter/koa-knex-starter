const { formatValidationError, ValidationError } = require("../errors")
const { defaultTo } = require("lodash")

module.exports = async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.type = "application/json"

    const status = err.statusCode || 500

    logger.error(err)

    if (err instanceof ValidationError) {
      ctx.body = { errors: formatValidationError(err) }
      ctx.status = defaultTo(status, 422)
    } else if (err.code === "SQLITE_CONSTRAINT") {
      ctx.body = { errors: {} }

      let path

      if (Number(err.errno) === 19) {
        const idx = err.message.lastIndexOf(".")
        if (idx !== -1) {
          path = err.message.substring(idx + 1, err.message.length)
        }
      }

      if (path) {
        ctx.body.errors[path] = ["has already been taken"]
        ctx.status = defaultTo(status, 422)
      } else {
        ctx.body.errors["unknown"] = [
          "some database constraint has failed unexpectedly",
        ]
        ctx.status = defaultTo(status, 500)
      }
    } else {
      ctx.status = defaultTo(status, 500)
    }
  }
}
