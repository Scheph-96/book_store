const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("combined"));

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.error("CONNECTION ERROR: ", err);
  });

const port = process.env.PORT || 2000;
app.listen(port, () => {
  console.log("The server is running on http://locahost:2000");
});
