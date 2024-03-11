const mongoose = require("mongoose");
const surveyModel = new mongoose.Schema({
  surveyName: {
    type: String,
    required: true,
  },
  proctorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
});

module.exports = mongoose.model("Survey", surveyModel);
