/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("property", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("postcode").notNullable();
    table.string("address").notNullable();
    table.string("agency").notNullable();
    table.integer("bedrooms").notNullable().unsigned();
    table.boolean("reception");
    table.boolean("pets");
    table.boolean("outdoor");
    table.string("picture");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("property");
};
