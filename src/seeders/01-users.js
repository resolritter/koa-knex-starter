const faker = require("faker")

const { getUnique, getId } = require("../mocks/utils")
const { defaultUserPassword } = require("../mocks/constants")
const { hashPassword } = require("../auth")

const users = [...Array(5).keys()].map(function () {
  return {
    id: getId(),
    email: getUnique(faker.internet.email),
  }
})

const getUsers = function () {
  return users.map(function ({ id, email }) {
    return {
      id,
      email,
      password: hashPassword(defaultUserPassword),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  })
}

module.exports.seed = async function (knex) {
  await knex("users").del()
  return knex("users").insert(getUsers())
}
