const config = require("config")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { pick } = require("lodash")

module.exports.hashPassword = function (password, isSync = false) {
  return bcrypt[isSync ? "hashSync" : "hash"](password, 8)
}

module.exports.comparePassword = bcrypt.compare

module.exports.withJWT = function (user = {}) {
  return Object.assign({}, user, {
    token: jwt.sign(
      {
        sub: pick(user, ["id", "email", "username"]),
      },
      config.get("secret"),
      {
        expiresIn: "7d",
      },
    ),
  })
}
