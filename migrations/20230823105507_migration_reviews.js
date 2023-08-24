/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("review", (table) => {
    table.increments("id").primary();
    table
      .integer("property_id")
      .unsigned()
      .references("property.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("condition")
      .notNullable()
      .defaultTo(1)
      .unsigned()
      .checkIn([1, 2, 3, 4, 5]);
    table
      .integer("confort")
      .notNullable()
      .defaultTo(1)
      .unsigned()
      .checkIn([1, 2, 3, 4, 5]);
    table
      .integer("safety")
      .notNullable()
      .defaultTo(1)
      .unsigned()
      .checkIn([1, 2, 3, 4, 5]);
    table
      .integer("management")
      .notNullable()
      .defaultTo(1)
      .unsigned()
      .checkIn([1, 2, 3, 4, 5]);
    table.text("comments");
    table.decimal("rating", 2, 2);
    table.integer("price").notNullable().unsigned();
    table.integer("date");
    table.string("picture");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("review");
};
