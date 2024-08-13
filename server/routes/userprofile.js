const express = require("express");
const router = express.Router();
const {
  addProfileDetails,
  getProfileDetails,
} = require("../controllers/profile");
router.route("/signup").post(addProfileDetails);
router.route("/profile/:email").get(getProfileDetails);

module.exports = router;
