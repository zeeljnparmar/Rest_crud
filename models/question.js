const mongoose = require("mongoose");
const questionModel = new mongoose.Schema({
  question_text: {
    type: String,
    required: true,
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Questions", questionModel);
