const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//register

//res.json is do same work as res.send but it is better and accept only json
router.post("/register", async (req, res) => {
  try {
    //check if email already exist in db
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) res.status(400).json("This email is already exist");
    //used bcrypt to encrypt password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,

      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    //find the username in database
    const user = await User.findOne({ username: req.body.username });
    //return err masg when user not present
    if (!user) res.status(400).json("wrong credential");
    //check the password with hashed password
    const validated = await bcrypt.compare(req.body.password, user.password);
    //return err if password does not match
    if (!validated) res.status(400).json("wrong credential");

    //we dont want to return password to user this will slect all ppt except password
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
