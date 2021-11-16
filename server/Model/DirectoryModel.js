const mongoose = require("mongoose");

const Directory = new mongoose.Schema(
  {
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    dateApplied: { type: String, required: true },
    status: { type: String, required: true },
    linkedAccounts: { type: String, required: true },
  },
  { collection: "directory-data" }
);

const model = mongoose.model("DirectoryData", Directory);

module.exports = model;
