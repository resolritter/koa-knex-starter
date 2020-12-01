const { accountsTable } = require("../constants")

exports.up = function (knex) {
  return knex.schema.createTable(accountsTable, function (table) {
    table.increments("id").primary().notNullable()
    table.string("email").unique().notNullable()
    table.string("password").notNullable()
    table.string("access_mask")
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(accountsTable)
}
