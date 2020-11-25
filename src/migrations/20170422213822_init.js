const tableName = "users"

exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id").primary().notNullable()
    table.string("email").unique().notNullable()
    table.string("password").notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists(tableName)
}
