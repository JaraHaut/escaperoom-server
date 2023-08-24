const propertyData = require("../seed-data/properties");
const reviewData = require("../seed-data/reviews");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("property").del();
  await knex("property").insert(propertyData);
  await knex("review").del();
  await knex("review").insert(reviewData);
};
