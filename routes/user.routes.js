const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/user.controller");

//making a call to

router.post("/register", register);
router.post("/login", login);
module.exports = router;
