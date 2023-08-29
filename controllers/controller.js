const knex = require("knex")(require("../knexfile"));

exports.getAllProperties = async (req, res) => {
  const properties = await knex("property");
  res.json(properties);
};

exports.getOneProperty = async (req, res) => {
  console.log(req.params.propertyId);
  console.log(req.params);
  try {
    const property = await knex("property")
      .where({ id: req.params.propertyId })
      .select("*");
    console.log(property);
    if (!property) {
      return res
        .status(404)
        .json({ message: `Property with ID: ${req.params.id} doesn't exist` });
    } else {
      res.json(property);
    }
  } catch (error) {
    res.status(500).json({
      message: `Unable to get details for property ID ${req.params.propertyId}`,
    });
  }
};

//post a new property:
exports.addNewProperty = async (req, res) => {
  console.log(req.body);
  if (
    !req.body.title ||
    !req.body.postcode ||
    !req.body.address ||
    !req.body.agency ||
    !req.body.bedrooms ||
    !req.body.reception ||
    !req.body.pets ||
    !req.body.outdoor ||
    !req.body.picture
  ) {
    return res.status(400).send("Please fill in all the required infomation");
  }
  console.log(req.body);
  try {
    console.log(req.body);
    const newProperty = await knex("property").insert(req.body);
    console.log(newProperty);
    const createdProperty = await knex("property")
      .where({ id: newProperty[0] })
      .first();
    console.log(createdProperty);
    res.status(201).json(createdProperty);
  } catch (error) {
    console.error("Error adding property", error);
    res.status(500).json({
      message: `Unable to add property data to database`,
    });
  }
};

//get all reviews for one property
exports.getAllReviews = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const reviews = await knex("review")
      .where({ property_id: propertyId })
      .select("*");
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({
        message: `Unable to fetch reviews for property with ID ${propertyId}`,
      });
  }
};

//post a new review
exports.addNewReview = async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const propertyId = req.params.propertyId;
    console.log(propertyId);
    const reviewData = { ...req.body, property_id: propertyId };
    console.log(reviewData);
    const newReview = await knex("review").insert(reviewData);
    console.log(newReview);
    const createdReview = await knex("review")
      .where({ id: newReview[0] })
      .first();
    console.log(newReview[0]);
    res.status(201).json(createdReview);
  } catch (error) {
    console.error("Error adding review", error);
    res.status(500).json({
      message: `Unable to add review to database`,
    });
  }
};

// exports.getAllAgents = async (req, res) => {
//   const agents = await knex("property"); //do i need a separate table for agencies???
//   res.json(properties);
// };
