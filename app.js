const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB = process.env.MONGODB_URL;
const PORT = process.env.PORT;
const port = PORT || 5001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(DB).then(() => {
  console.log("connected to database");
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELET,GET");
    return res.status(200).json({});
  }
  next();
});
app.get("/", (req, res) => {
  res.status(200).json({
    message: "This Is Project File",
  });
});
app.use("/project",require ("./routes/project_team.routes"))

app.listen(port, () => {
  console.log(`servere use port no ${port}`);
});
