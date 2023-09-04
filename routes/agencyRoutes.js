const express = require("express");
const router = require("express").Router();
const controller = require("../controllers/controller");
const knex = require("knex")(require("../knexfile"));

router.route("/").get(controller.getAllAgencies);

router.route("/:agency").get(controller.getAllPropertiesByAgency);

module.exports = router;
