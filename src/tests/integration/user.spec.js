const faker = require("faker")
const fetch = require("node-fetch")
const cp = require("child_process")
const path = require("path")

const { portAcquisitionHost, serverPath } = require("./lib/constants")
const { getUnique } = require("../../mocks/utils")
const { initLibUser, snapshot } = require("./lib/user")

const createUserAndUpdate = async function () {
  const { createUser, updateUser, loginWithUser } = initLibUser(...arguments)
  let user

  user = await createUser()
  snapshot(user)

  user = await loginWithUser(user)
  snapshot(user)

  user = await updateUser({
    ...user,
    email: `updated_${user.email}`,
  })
  snapshot(user)
}

describe("Tests the user API", function () {
  const tests = [["Creates a user and updates it", createUserAndUpdate]]

  tests.map(function ([title, test]) {
    it(title, async function () {
      let port, serverProc, isFinished
      try {
        const acquireResponse = await fetch(
          `${portAcquisitionHost}/acquirePort`,
          {
            method: "GET",
            mode: "cors",
          },
        )
        expect(acquireResponse.status).toBe(201)
        port = await acquireResponse.text()

        serverProc = cp.spawn("node", [serverPath, port], {
          cwd: path.join(path.dirname(serverPath), ".."),
        })
        await new Promise(function (resolve) {
          serverProc.stdout.on("data", function (data) {
            resolve()
            if (!isFinished) {
              console.log("SERVER", data.toString())
            }
          })
          serverProc.stderr.on("data", function (err) {
            err = err.toString()
            if (!isFinished) {
              console.log(err)
              throw new Error("SERVER", err)
            }
          })
        })

        await test({ host: `http://127.0.0.1:${port}` })
      } finally {
        if (serverProc) {
          serverProc.kill()
        }
        isFinished = true
      }
    })
  })
})
