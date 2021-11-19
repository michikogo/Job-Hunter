// Import npm packages
const path = require("path");
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

mongoose.connect(
  "mongodb+srv://admin:1234@userschema.dqeqq.mongodb.net/directory-schema?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});

app.use("/user", UserController);
app.use("/directory", DirectoryController);

app.listen(8000, () => {
  console.log("Listen to 8000");
});
