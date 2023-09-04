require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8002;
const propertyRoutes = require("./routes/propertyRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const agencyRoutes = require("./routes/agencyRoutes");
const cors = require("cors");

app.use(express.json());

app.use(cors());

// all properties routes
app.use("/properties", propertyRoutes);

// all review routes
app.use("/reviews", reviewRoutes);

//all agencies
app.use("/agencies", agencyRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
