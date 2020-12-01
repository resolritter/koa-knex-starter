const { usersTable } = require("../constants")

exports.up = function (knex) {
  return knex.schema.createTable(usersTable, function (table) {
    table.increments("id").primary().notNullable()
    table.string("email").unique().notNullable()
    table.string("password").notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(usersTable)
}
