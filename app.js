const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { DB, PORT } = require("./config/config");
const port = PORT || 5001;
const Resource = require("./entity/resource.entity");
const ProjectTeam = require("./entity/project-team.entity");
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
app.post("/project/create", (req, res) => {
  const resourceIds = req.body.resourceIds;
  const projectTeam = new ProjectTeam({
    _id: new mongoose.Types.ObjectId(),
    projectTeamName: req.body.projectTeamName,
    resourceIds: req.body.resourceIds,
  });
  Resource.find({ _id: resourceIds })
    .then((resource) => {
      projectTeam
        .save()
        .then((result) => {
          return res.status(200).json({
            success: true,
            data: result,
            message: "projectTeam create successfully",
          });
        })
        .catch((e) => {
          return res.status(400).json({
            success: false,
            message: e,
          });
        });
    })
    .catch((err) => {
      return res.status(402).json({
        success: false,
        message: err,
      });
    });

  // const projectTeam = new ProjectTeam({
  //   _id: new mongoose.Types.ObjectId(),
  //   Name: req.body.firstName,
  //   projectTeamName: req.body.projectTeamName,
  //   resourceIds: req.body.resourceIds,
  // });
  // projectTeam
  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     return res.status(200).json({
  //       success: true,
  //       message: "projectTeam create successfully",
  //     });
  //   })
  //   .catch((e) => {
  //     return res.status(400).json({
  //       success: false,
  //       message: e,
  //     });
  //   });
  // });
});

app.put("/project/add/resource",async (req, res) => {
  const p=await ProjectTeam.findOne({ _id: req.body.projectTeamId })
      if (p) {
        const r=Resource.find({ _id: req.body.resourceId })
        if(r){
            ProjectTeam.updateOne(req.body.projectTeamId, req.body.resourceId, (err, todo) => {
              // Handle any possible database errors
                  if (err) return res.status(500).send(err);
                  return res.send(todo);
              });
            }else{
            return res.status(400).json({
              message: `${req.body.resourceId} Id does not exist`,
            });
            }
      }
      return res.status(202).json({
        success: false,
        data: {},
        message: "project not found",
      });
  
});

app.get("/project", (req, res) => {
  ProjectTeam.find()
    .then((projectTeams) => {
      return res.status(200).json(projectTeams);
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});

app.listen(port, () => {
  console.log(`servere use port no ${port}`);
});