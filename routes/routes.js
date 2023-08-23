const router = require("express").Router();
const controller = require("../controllers/controller");
const knex = require("knex")(require("../knexfile"));

router.route("/").get(controller.getAll).post(controller.add);

router.route("/posts").get(controller.getAllPosts);

module.exports = router;
