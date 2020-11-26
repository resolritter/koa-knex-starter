const fetch = require("node-fetch")

const { getRandomUser } = require("../../../mocks/user")

module.exports.createUser = async function () {
  await fetch("/user", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getRandomUser()),
  })
}
