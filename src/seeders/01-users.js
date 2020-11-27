const { getRandomUser } = require("../mocks/user")
const { usersTable } = require("../constants")

module.exports.seed = async function (knex) {
  await knex(usersTable).del()

  const users = [...Array(5).keys()].map(getRandomUser)
  console.log("Seeding users")
  console.log(users)
  return knex(usersTable).insert(users)
}
