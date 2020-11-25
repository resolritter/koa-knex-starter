const { defaultTo } = require("lodash")

const { ValidationError, formatValidationError } = require("../error")

module.exports = async (ctx, next) => {
  try {
    await next()
    ctx.assert(ctx.response.body && Number(ctx.response.status) !== 404, 404)
  } catch (err) {
    ctx.type = "application/json"

    const status =
      err.status ||
      err.statusCode ||
      err.status_code ||
      (err.output && err.output.statusCode) ||
      (err.oauthError && err.oauthError.statusCode) ||
      500

    if (!ctx.response.body) {
      ctx.response.body = { errors: {} }
    }
    // ctx.app.emit('error', err, ctx);
    console.error(err)

    if (err instanceof ValidationError) {
      ctx.body.errors = formatValidationError(err)
      ctx.status = defaultTo(status, 422)
    } else if (err.code === "SQLITE_CONSTRAINT") {
      let path = "unknown"

      if (Number(err.errno) === 19) {
        // SQLITE3 UNIQUE
        const idx = err.message.lastIndexOf(".")
        if (idx !== -1) {
          path = err.message.substring(idx + 1, err.message.length)
          ctx.body.errors[path] = ["has already been taken"]
        }
      }

      ctx.status = defaultTo(status, 422)
    } else {
      ctx.status = defaultTo(status, 500)
    }
  }
}
