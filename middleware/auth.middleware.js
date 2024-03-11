const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authorized = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (!token) {
      return res.status(400).send("token not found");
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(404).send("there is an error");
      }
      User.findById(decoded.id, (err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (!user) {
          return res.status(404), send("user not found");
        }
        req.user = user;
        next();
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
