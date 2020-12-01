const { getRandomUser } = require("../mocks/user")
const { defaultUserPassword } = require("../mocks/constants")
const { usersTable } = require("../constants")

module.exports.seed = async function (knex) {
  await knex(usersTable).del()

  const users = [...Array(5).keys()].map(function (i) {
    return getRandomUser({ email: `u${i}@u.com` })
  })
  console.log("\nSeeding users")
  console.log(
    users.map(function (user) {
      return { ...user, password: defaultUserPassword }
    }),
  )
  console.log("\n")
  return knex(usersTable).insert(users)
}
