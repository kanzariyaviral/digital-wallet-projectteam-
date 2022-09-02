const Resource = require("../entity/resource.entity");
const ProjectTeam = require("../entity/project-team.entity");
const logger = require("../logger");
const resourceService = require("../resource_services/resource.service");
const mongoose = require("mongoose");

exports.projectTemeCreate = (req, res) => {
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
};
exports.resourceAddInProjectTeam = (req, res) => {
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
};
exports.getAllProjectTeam = (req, res) => {
  const err = {
    status: 400,
    message: "error",
  };
  //   // Log a message
  // logger.log({
  //   // Message to be logged
  //       message: 'Hello, Winston!',

  //   // Level of the message logging
  //       level: 'info'
  //   });
  //   // Log a message
  // logger.info('Hello, Winston!');
  ProjectTeam.find()
    .then((projectTeams) => {
      logger.error(
        `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
          req.originalUrl
        } - ${req.method} - ${req.ip}`
      );
      return res.status(200).json(projectTeams);
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};
exports.projectTemeCreateWithMicro = async (req, res) => {
  let resourceIds = req.body.resourceIds;
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  resourceIds = resourceIds.filter(onlyUnique);
  const getResources = await resourceService.getResourcesFunc(resourceIds[0]);
  if (getResources.success === true) {
    const fullName = `${getResources?.data?.firstName} ${getResources?.data?.lastName}`;
    const projectTeam = new ProjectTeam({
      _id: new mongoose.Types.ObjectId(),
      projectTeamName: req.body.projectTeamName,
      resourceIds: resourceIds,
      resourceName: fullName,
    });
    projectTeam
      .save()
      .then((result) => {
        return res.status(200).json({
          success: true,
          data: result,
          message: "projectTeam create successfully",
        });
      })
      .catch((err) => {
        logger.error(
          `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
            req.originalUrl
          } - ${req.method} - ${req.ip}`
        );
        return res.status(400).json({
          success: false,
          message: err,
        });
      });
  } else {
    return res.status(402).json({
      success: false,
      message: "Resource Not Found",
    });
  }
};
