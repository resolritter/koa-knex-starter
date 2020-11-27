const yup = require("yup")

const { canBeParsedToInteger } = require("./utils")
const timestampSchema = require("./timestamp")

const getUserValidator = function (mode) {
  const shape = {
    email: yup.string().required().email(),

    password: yup.string().when("$validatePassword", {
      is: true,
      then: yup.string().required(),
    }),
  }

  if (mode === "POST") {
    return yup.object().shape(shape)
  } else if (mode !== "PUT") {
    throw new Error(`Invalid mode ${mode}`)
  }

  shape.id = yup.string().test({
    name: "id",
    test: canBeParsedToInteger,
  })

  return yup.object().shape(shape).noUnknown().concat(timestampSchema)
}

module.exports = ["POST", "PUT"].reduce(function (acc, httpMethod) {
  acc[`${httpMethod.toLowerCase()}Validator`] = getUserValidator(httpMethod)
  return acc
}, {})
