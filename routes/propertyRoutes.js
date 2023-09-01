const express = require("express");
const router = require("express").Router();
const controller = require("../controllers/controller");
const knex = require("knex")(require("../knexfile"));
// const cors = require("cors");

router.route("/").get(controller.getAllProperties);

router.route("/:propertyId").get(controller.getOneProperty);

router.route("/add").post(controller.addNewProperty);

module.exports = router;
