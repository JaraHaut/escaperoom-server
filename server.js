require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;
const routes = require("./routes/routes");

app.use(express.json()); //this has to be at the top!!!

// all properties routes
app.use("/properties", routes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
