const express = require("express");
const router = require("express").Router();
const controller = require("../controllers/controller");
const knex = require("knex")(require("../knexfile"));

router.route("/:propertyId/review").post(controller.addNewReview);

router.route("/:propertyId/reviews").get(controller.getAllReviews);

module.exports = router;
