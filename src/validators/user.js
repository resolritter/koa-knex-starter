const yup = require("yup")

const { canBeParsedToInteger } = require("./utils")
const timestampSchema = require("./timestamp")

module.exports = yup
  .object()
  .shape({
    id: yup.string().test({
      name: "id",
      test: canBeParsedToInteger,
    }),

    email: yup.string().required().email(),

    password: yup.string().when("$validatePassword", {
      is: true,
      then: yup.string().required(),
    }),
  })
  .noUnknown()
  .concat(timestampSchema)
