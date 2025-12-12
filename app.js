const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authorRoutes = require('./routes/author.route');
const bookRoutes = require('./routes/book.route');
const genreRoutes = require('./routes/genre.route');
const orderRoutes = require('./routes/order.route');
const reviewRoutes = require('./routes/review.route');
const userRoutes = require('./routes/user.route');

const { swaggerSpec, swaggerUi } = require("./swagger.js");

require("dotenv").config();

const app = express();

const api_prefix = process.env.API_URL;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.use(`${api_prefix}/author`, authorRoutes);
app.use(`${api_prefix}/book`, bookRoutes);
app.use(`${api_prefix}/genre`, genreRoutes);
app.use(`${api_prefix}/order`, orderRoutes);
app.use(`${api_prefix}/review`, reviewRoutes);
app.use(`${api_prefix}/user`, userRoutes);

app.use((err, req, res, next) => {
  console.error(err);  
  return res.status(500).json({success: false, message: 'Unexpected error, Please try again later!'});
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      tryItOutEnabled: false, // globally disable "Try it out"
    },
  }));

mongoose.connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch((err) => {
    console.error("CONNECTION ERROR: ", err);
  });

const port = process.env.PORT || 2000;
app.listen(port, "0.0.0.0", () => {
  console.log(`The server is running on ${process.env.BASE_URL}`);
});
