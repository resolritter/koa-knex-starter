const faker = require("faker")
const fetch = require("node-fetch")
const cp = require("child_process")
const path = require("child_process")

const portManager = path.resolve("../../../scripts/port_manager.js")
const serverLauncher = path.resolve("../../main.js")
const { getUnique } = require("../../mocks/utils")

describe("Tests the user API", function () {
  const tests = [
    [
      "Creates a user and updates it",
      async function () {
        let res, user

        res = await fetch("/user", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        })
        expect(res.status).toBe(201)

        user = await res.body.json()
        expect(user.email).not.toBeUndefined()
        expect(user.email.length).not.toBe(1)

        let email
        while (true) {
          email = getUnique(faker.internet.email)
          if (email != user.email) {
            break
          }
        }

        res = await fetch("/user", {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        })

        expect(res.status).toBe(201)

        user = await res.body.json()
        expect(user).not.toBeUndefined()
        expect(Object.keys(user)).toBeGreaterThan(0)
      },
    ],
  ]

  tests.map(function ([title, test]) {
    it(title, async function () {
      let port, serverLauncher
      try {
        port = cp.execSync(`${portManager} get`)
        serverLauncher = cp.execSync(
          `DB_NAME=${port} DB_PORT=${port} node '${serverLauncher}'`,
        )
        await test()
      } finally {
        if (port) {
          cp.execSync(`${portManager} free ${port}`)
        }
      }
    })
  })
})
