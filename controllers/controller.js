const knex = require("knex")(require("../knexfile"));

//get all the properties
exports.getAllProperties = async (req, res) => {
  const properties = await knex("property");
  res.json(properties);
};

//get one property by id
exports.getOneProperty = async (req, res) => {
  try {
    const property = await knex("property")
      .where({ id: req.params.propertyId })
      .select("*");

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
    return res.status(400).send("Please fill in all the required information");
  }

  try {
    const newProperty = await knex("property").insert(req.body);

    const createdProperty = await knex("property")
      .where({ id: newProperty[0] })
      .first();

    res.status(201).json(createdProperty);
  } catch (error) {
    console.error("Error adding property", error);
    res.status(500).json({
      message: `Unable to add property data to database`,
      error,
    });
  }
};

//get all reviews for one property by id
exports.getAllReviews = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const reviews = await knex("review")
      .where({ property_id: propertyId })
      .select("*");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: `Unable to fetch reviews for property with ID ${propertyId}`,
    });
  }
};

//post a new review to a selected property by id
exports.addNewReview = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;

    const reviewData = { ...req.body, property_id: propertyId };

    const newReview = await knex("review").insert(reviewData);

    const createdReview = await knex("review")
      .where({ id: newReview[0] })
      .first();

    res.status(201).json(createdReview);
  } catch (error) {
    console.error("Error adding review", error);
    res.status(500).json({
      message: `Unable to add review to database ${error.message}`,
    });
  }
};

//get all the agencies in the database
exports.getAllAgencies = async (req, res) => {
  try {
    const agencies = await knex.distinct().from("property").pluck("agency");

    res.json(agencies);
  } catch (error) {
    console.error("Error fetching agencies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all properties for one agency
exports.getAllPropertiesByAgency = async (req, res) => {
  console.log(req.body);
  try {
    const agency = req.params.agency;

    const propertiesFiltered = await knex("property").where({ agency: agency });

    res.json(propertiesFiltered);
  } catch (error) {
    console.error("Error fetching properties by agency:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
