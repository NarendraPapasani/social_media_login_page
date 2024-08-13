const userProfileSchema = require("../models/userProfileDetails");

const addProfileDetails = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      sex,
      mobileNumber,
      interest,
      coverPhoto,
      profilePhoto,
    } = req.body;
    const user = await userProfileSchema.create({
      name,
      email,
      password,
      sex,
      mobileNumber,
      interest,
      coverPhoto,
      profilePhoto,
    });
    res.status(201).send("User created Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

const getProfileDetails = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    const user = await userProfileSchema.findById(email);
    res.status(200).send(user);
  } catch (error) {
    console.log(`backend error:${error}`);
  }
};

module.exports = { addProfileDetails, getProfileDetails };
