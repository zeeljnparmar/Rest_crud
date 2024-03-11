const Survey = require("../models/survey");
const Question = require("../models/question");
const { insertMany } = require("../models/survey");
const answer = require("../models/answer");
const question = require("../models/question");
const survey = require("../models/survey");

exports.create = async (req, res) => {
  try {
    const { name, question } = req.body;
    const survey = new Survey({
      surveyName: name,
      proctorID: req.user._id,
    });
    await survey.save();
    let newque = question.map((q) => {
      q.formId = survey._id;
      return q;
    });
    newque = await Question.insertMany(question);
    return res.status(200).send("questions send successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("an error occured");
  }
};

exports.answer = async (req, res) => {
  try {
    const { survey_id, answer_id } = req.params;

    let errors = req.body.answer
      .map((ans, index) => {
        console.log(ans.ans);
        if (
          !(
            ans.ans !== null &&
            ans.ans !== undefined &&
            ans.question_Id &&
            ans.user_id
          )
        ) {
          return `${index} is null.`;
        }
      })
      .filter((str) => str);

    if (errors && errors.length != 0) {
      return res.status(400).send(errors);
    }
    let ques = await Question.find({ formId: survey_id }).count();
    if (ques != req.body.answer.length) {
      return res.status(400).send({ err: "more questions than answer" });
    }

    let ans = await answer
      .find({
        user_id: answer_id,
      })
      .populate({ path: "question_Id", match: { formId: survey_id } });
    // console.log(ans);
    if (ans && ans.length !== 0) {
      return res.status(401).send("error");
    }
    let new_ans = await answer.insertMany(req.body.answer);
    return res.status(201).send(new_ans);
  } catch (err) {
    console.log(err);
    return res.status(500).send("server side err");
  }
};

exports.getAnswer = async (req, res) => {
  try {
    let survey_id = req.params.survey_id;
    
    let user = await survey.findOne({ _id: survey_id });
    if (user.proctorID.toString() !== req.user._id.toString()) {
      return res.status(401).send("unauthorized user");
    }
    let ans = await answer
      .find()
      .populate({ path: "question_Id", match: { formId: survey_id } })
      .populate({ path: "user_id" });

    let map = new Map();
    ans.map((a, index) => {
      if (!map.has(a.question_Id._id)) {
        map.set(a.question_Id._id, [0, 0]);
      }
      if (a.ans) {
        map.get(a.question_Id._id)[0]++;
      } else {
        map.get(a.question_Id._id)[1]++;
      }
    });
    console.log(map);
    return res.status(200).send(Object.fromEntries(map));
  } catch (error) {
    return res.status(500).send("Server Response.");
  }
};
