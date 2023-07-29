//
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const DBconnect = require("./DBConnection");
const app = express();
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const { errorMiddleware } = require("./middlewares/ErrorHandler");
app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
const server = app.listen(process.env.PORT);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};
// DBconnect();
connectDB();
console.log(`Connected to port ${process.env.PORT}`);

// Global Error Handling
app.use(errorMiddleware);

//Routes
app.use(authRoutes, errorMiddleware);
app.use("/notes", noteRoutes, errorMiddleware);
