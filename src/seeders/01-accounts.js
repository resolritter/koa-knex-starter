const { getRandomAccount } = require("../mocks/account")
const { defaultUserPassword } = require("../mocks/constants")
const { accountsTable, adminAccessMask } = require("../constants")

module.exports.seed = async function (knex) {
  await knex(accountsTable).del()

  const users = [
    getRandomAccount({ email: `admin@u.com`, access_mask: adminAccessMask }),
    ...[...Array(4).keys()].map(function (i) {
      return getRandomAccount({ email: `u${i}@u.com` })
    }),
  ]
  console.log("\nSeeding accounts")
  console.log(
    users.map(function (user) {
      return { ...user, password: defaultUserPassword }
    }),
  )
  console.log("\n")
  return knex(accountsTable).insert(users)
}
