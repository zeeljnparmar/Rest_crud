const env = process.env.NODE_ENV || "environment";
if (env === "environment") {
  require("dotenv/config");
}
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//const im = require("imagemagick");
const { default: mongoose } = require("mongoose");
const PORT = process.env.PORT || 3000;

//routes
const surveyRoutes = require("./routes/survey.routes");
const userRoutes = require("./routes/user.routes");

//data from front end
app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
  })
);
app.use(bodyParser.json());

//cookie coollection from front end
app.use(cookieParser());

//database connectivity
mongoose
  .connect(process.env.DBMS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

//user and server routes
app.use("/api/survey", surveyRoutes);
app.use("/api/user", userRoutes);

//testing route for sample
app.get("/", (req, res) => {
  res.send("hello world");
});

//making server to listen
app.listen(PORT, () => {
  console.log(`running at port ${PORT}`);
});

//image thumbnail
// im.convert(
//   ["kittens.jpg", "-resize", "50x50", "kittens-small.jpg"],
//   (err, stdout) => {
//     if (err) throw err;
//     console.log("stdout:", stdout);
//   }
// );
