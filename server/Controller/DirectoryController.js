const router = require("express").Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../Model/UserModel");
const DirectoryModel = require("../Model/DirectoryModel");
const { update } = require("../Model/UserModel");

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

router.route("/contents/:id").put(async (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  DirectoryModel.findById(id)
    .then((updateData) => {
      console.log("updateData");
      console.log(updateData.location);
      const updateTemp = updateData;

      if (req.body.companyName !== "") {
        updateTemp.companyName = req.body.companyName;
      }
      if (req.body.role !== "") {
        updateTemp.role = req.body.role;
      }
      if (req.body.location !== "") {
        updateTemp.location = req.body.location;
      }
      if (req.body.dateApplied !== "") {
        updateTemp.dateApplied = req.body.dateApplied;
      }
      if (req.body.linkedAccounts !== "") {
        updateTemp.linkedAccounts = req.body.linkedAccounts;
      }
      if (req.body.status !== "") {
        updateTemp.status = req.body.status;
      }
      updateData
        .save()
        .then((data) => console.log("[UPDATE] " + data))
        .catch((err) => console.log("[UPDATE] " + err));
      return res.json({ status: "ok" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/contents/:id").delete(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  DirectoryModel.findByIdAndRemove(id).exec();
  console.log("[DELETE]");
});

module.exports = router;
