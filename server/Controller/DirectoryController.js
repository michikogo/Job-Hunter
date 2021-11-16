const router = require("express").Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../Model/UserModel");
const DirectoryModel = require("../Model/DirectoryModel");

router.route("/contents").get(async (req, res) => {
  console.log("GET request");
  console.log(req.body);
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await UserModel.findOne({ email: email });

    const userContent = await DirectoryModel.find({ email: email });

    console.log(user);
    return res.json({
      status: "ok",
      name: user.name,
      email: user.email,
      content: userContent,
    });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invalid token" });
  }
});

router.route("/contents").post(async (req, res) => {
  console.log("POST request");
  console.log(req.body);
  const token = req.headers["x-access-token"];

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await DirectoryModel.create({
      email: email,
      companyName: req.body.companyName,
      role: req.body.role,
      location: req.body.location,
      dateApplied: req.body.dateApplied,
      linkedAccounts: req.body.linkedAccounts,
      status: req.body.status,
    });

    return res.json({ status: "ok", user: user });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "invalid token" });
  }
});

module.exports = router;
