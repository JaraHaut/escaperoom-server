const express = require("express");
const router = require("express").Router();
const controller = require("../controllers/controller");
const knex = require("knex")(require("../knexfile"));

router.route("/").get(controller.getAllProperties);

router.route("/:propertyId").get(controller.getOneProperty);

router.route("/add").post(controller.addNewProperty);

router.route("/:propertyId/review").post(controller.addNewReview);

// router.route("/agents").get(controller.getAllAgents);

// router.route("/agents/:agentId").get(controller.getOneAgent);

module.exports = router;
