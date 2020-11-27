const faker = require("faker")

const { getUnique, getId } = require("../mocks/utils")
const { defaultUserPassword } = require("../mocks/constants")
const { hashPassword } = require("../auth")

module.exports.getRandomUser = function () {
  const id = getId()
  const email = getUnique(faker.internet.email)

  return {
    id,
    email,
    password: hashPassword(defaultUserPassword, true),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}
