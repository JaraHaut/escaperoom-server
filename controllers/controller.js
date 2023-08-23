const knex = require("knex")(require("../knexfile"));

exports.getAllProperties = async (req, res) => {
  const properties = await knex("property");
  res.json(properties);
};

module.exports = router;
