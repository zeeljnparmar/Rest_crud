const express = require("express");
const router = express.Router();
const { authorized } = require("../middleware/auth.middleware");
const { create, answer, getAnswer } = require("../controller/survey.controller");
router.post("/create", [authorized], create);
router.post("/answer/:survey_id/:answer_id", [authorized], answer);
router.get("/get/:survey_id", [authorized], getAnswer);

module.exports = router;
