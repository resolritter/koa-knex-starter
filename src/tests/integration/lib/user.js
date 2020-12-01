const fetch = require("node-fetch")
const { omit } = require("lodash")

const sanitizeForSnapshots = function (user) {
  return omit(user, ["token", "password", "updated_at", "created_at"])
}

module.exports.snapshot = function (user) {
  expect(sanitizeForSnapshots(user)).toMatchSnapshot()
}

module.exports.initLibUser = function ({ host }) {
  let createUserCount = 0

  return {
    createUser: async function () {
      const id = ++createUserCount
      const password = "password"

      const res = await fetch(`${host}/api/user`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `user${id}@user.com`,
          password,
        }),
      })
      expect(res.status).toBe(201)

      return { ...(await res.json()), password }
    },
    updateUser: async function (user) {
      const res = await fetch(`${host}/api/user/${user.id}/edit`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(omit(user, ["token"])),
      })
      expect(res.status).toBe(200)

      return { ...user, ...(await res.json()) }
    },
    loginWithUser: async function (user) {
      const res = await fetch(`${host}/api/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      expect(res.status).toBe(200)

      return { ...user, ...(await res.json()) }
    },
  }
}
