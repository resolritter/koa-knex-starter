const yup = require("yup")
const isISO8601 = require("validator/lib/isISO8601")

module.exports = yup
  .object()
  .shape({
    created_at: yup
      .string()
      .required()
      .test({
        name: "created_at",
        message: "${path} must be valid ISO8601 date", // eslint-disable-line
        test: (value) =>
          value ? isISO8601(new Date(value).toISOString()) : true,
      })
      .transform(function (value) {
        return this.isType(value) && value !== null
          ? new Date(value).toISOString()
          : value
      })
      .default(() => new Date().toISOString()),

    updated_at: yup
      .string()
      .required()
      .test({
        name: "updated_at",
        message: "${path} must be valid ISO8601 date", // eslint-disable-line
        test: (value) =>
          value ? isISO8601(new Date(value).toISOString()) : true,
      })
      .transform(function (value) {
        return this.isType(value) && value !== null
          ? new Date(value).toISOString()
          : value
      })
      .default(() => new Date().toISOString()),
  })
  .noUnknown()
