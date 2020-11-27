const http = require("http")
const { defaultTo } = require("lodash")
const { ValidationError } = require("yup")

module.exports.ValidationError = ValidationError

class AuthenticationError extends Error {
  constructor(message = http.STATUS_CODES[401]) {
    super(message)
    this.message = message
    this.statusCode = 401

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
module.exports.AuthenticationError = AuthenticationError

class AuthorizationError extends Error {
  constructor(message = http.STATUS_CODES[403]) {
    super(message)
    this.message = message
    this.statusCode = 403

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
module.exports.AuthorizationError = AuthorizationError

class NotFoundError extends Error {
  constructor(message = http.STATUS_CODES[404]) {
    super(message)
    this.message = message
    this.statusCode = 404

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
module.exports.NotFoundError = NotFoundError

const formatValidationError = function (err) {
  const result = {}
  if (err.path) {
    result[err.path] = [defaultTo(err.message, "is not valid")]
  }
  if (err.inner && err.inner.length > 0) {
    err.inner
      .map((err) => formatValidationError(err))
      .reduce((prev, curr) => Object.assign(prev, curr), result)
  }
  return result
}
module.exports.formatValidationError = formatValidationError
