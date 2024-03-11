const User = require("../models/user");
const jwt = require("jsonwebtoken");
const brcypt = require("bcryptjs");

exports.login = async (req, res) => {
  try {
    if (!req.body.userName || !req.body.password) {
      return res.status(400).send("Bad Request");
    }
    let user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(404).send("User not Found");
    }
    const match = await brcypt.compareSync(req.body.password, user.password);
    console.log(req.body.password + "  " + user.password);
    if (!match) {
      return res.status(404).send("User Password Doesn't match");
    }
    let token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).send(token);
  } catch (err) {
    return res.status(500).send(err);
  }
};
exports.register = async (req, res) => {
  try {
    const pass = await brcypt.hash(req.body.password, 10);
    const user = new User({
      userName: req.body.userName,
      password: pass,
    });
    const data = await user.save();
    res.json(data);
  } catch (err) {
    res.send(err);
  }
};
