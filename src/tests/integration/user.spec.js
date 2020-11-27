const { initLibUser, snapshot } = require("./lib/user")
const { serviceOrchestrationWrapper } = require("./lib/utils")

const tests = [
  [
    "Creates a user and updates it",
    async function () {
      const { createUser, updateUser, loginWithUser } = initLibUser(
        ...arguments,
      )

      let user = await createUser()
      snapshot(user)

      user = await loginWithUser(user)
      snapshot(user)

      user = await updateUser({
        ...user,
        email: `updated_${user.email}`,
      })
      snapshot(user)
    },
  ],
]

describe("Tests the user API", function () {
  tests.map(function ([title, test]) {
    it(title, serviceOrchestrationWrapper(test))
  })
})
