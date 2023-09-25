const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./src/routes/routes");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const dbURL = "mongodb://localhost:27017/parametric-superform-generator";

app.use(bodyParser.json());

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use("/api", routes);
