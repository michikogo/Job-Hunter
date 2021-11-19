// Import npm packages
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import Routers
const UserController = require("./Controller/UserController");
const DirectoryController = require("./Controller/DirectoryController");

// Uses express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.use("/user", UserController);
app.use("/directory", DirectoryController);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Listen to " + PORT);
});
