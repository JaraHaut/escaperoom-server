require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8002;
const routes = require("./routes/routes");
const cors = require("cors");

app.use(express.json()); //this has to be at the top!!!

app.use(cors());
// all properties routes
app.use("/properties", routes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
