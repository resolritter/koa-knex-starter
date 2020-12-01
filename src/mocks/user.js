const faker = require("faker")

const { getUnique } = require("../mocks/utils")
const { defaultUserPassword } = require("../mocks/constants")
const { hashPassword } = require("../auth")

module.exports.getRandomUser = function ({ email, ...rest }) {
  return {
    email: email ?? getUnique(faker.internet.email),
    password: hashPassword(defaultUserPassword, true),
    ...rest,
  }
}
