const { getRandomUser } = require("../mocks/user")

module.exports.seed = async function (knex) {
  await knex("users").del()
  return knex("users").insert([...Array(5).keys()].map(getRandomUser))
}
