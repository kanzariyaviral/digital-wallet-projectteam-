const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");
const dotenv = require("dotenv");
dotenv.config();
const DB = process.env.MONGODB_URL;
const PORT = process.env.PORT;
const RESOURCE_URL = process.env.RESOURCE_URL;
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
  let resourceIds = req.body.resourceIds;
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  resourceIds = resourceIds.filter(onlyUnique);
  const projectTeam = new ProjectTeam({
    _id: new mongoose.Types.ObjectId(),
    projectTeamName: req.body.projectTeamName,
    resourceIds: resourceIds,
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
});

app.put("/project/add/resource", (req, res) => {
  ProjectTeam.findOne({ _id: req.body.projectTeamId })
    .then((p) => {
      Resource.find({ _id: req.body.resourceId })
        .then((resource) => {
          let newBoard = new Resource({
            _id: req.body.projectTeamId,
            resourceIds: req.body.resourceId,
          });
          ProjectTeam.findOneAndUpdate(
            { _id: req.body.projectTeamId },
            { resourceIds: req.body.resourceId },
            function (err, docs) {
              if (err) {
                return res.json({
                  success: false,
                  message: err,
                });
              } else {
                return res.json({
                  success: true,
                  message: "Project Team Update Sucessfully",
                });
              }
            }
          );
        })
        .catch((err) => {
          return res.json({
            success: false,
            message: err,
          });
        });
    })
    .catch((err) => {
      return res.status(202).json({
        success: false,
        data: {},
        message: "project not found",
      });
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
app.post("/project/create-micro", async (req, res) => {
  let resourceIds = req.body.resourceIds;
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  resourceIds = resourceIds.filter(onlyUnique);
  const projectTeam = new ProjectTeam({
    _id: new mongoose.Types.ObjectId(),
    projectTeamName: req.body.projectTeamName,
    resourceIds: resourceIds,
  });
  const getResources = await getResourcesFunc(resourceIds[0]);
  if (getResources.success === true) {
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
  } else {
    return res.status(402).json({
      success: false,
      message: "Resource Not Found",
    });
  }
});

const getResourcesFunc = (resourceId) => {
  return new Promise(function (resolve, reject) {
    request.get(
      {
        headers: { "content-type": "application/json" },
        url: `${RESOURCE_URL}/by/${resourceId}`,
      },
      (err, resourseResponse) => {
        const _body = JSON.parse(resourseResponse.body);
        if (!err && _body.success === true) {
          resolve(_body);
        } else {
          resolve(_body);
        }
      }
    );
  });
};

app.listen(port, () => {
  console.log(`servere use port no ${port}`);
});
