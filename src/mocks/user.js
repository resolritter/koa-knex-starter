const faker = require("faker")

const { getUnique, getId } = require("../mocks/utils")
const { defaultUserPassword } = require("../mocks/constants")
const { getRandomUser } = require("../mocks/user")
const { hashPassword } = require("../auth")

module.exports.getRandomUser = function () {
  const id = getId()
  const email = getUnique(faker.internet.email)

  return {
    id,
    email,
    password: hashPassword(defaultUserPassword),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
