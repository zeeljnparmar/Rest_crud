const mongoose = require("mongoose");
const answerModel = new mongoose.Schema({
  ans: {
    type: Boolean,
    required: true,
  },
  question_Id: {
    type: mongoose.Types.ObjectId,
    ref: "Questions",
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
});
module.exports = mongoose.model("Answer", answerModel);
