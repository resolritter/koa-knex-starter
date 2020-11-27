const { getRandomUser } = require("../mocks/user")

module.exports.seed = async function (knex) {
  await knex("users").del()

  const users = [...Array(5).keys()].map(getRandomUser)
  console.log("Seeding users")
  console.log(users)
  return knex("users").insert(users)
}
