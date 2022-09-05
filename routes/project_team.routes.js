const express=require('express')
const router=express.Router()
const projectTeamController=require("../controller/project_team.controller")

// router.post("/create",projectTeamController.projectTemeCreate)
// router.put("/add/resource",projectTeamController.resourceAddInProjectTeam)
router.get("/",projectTeamController.getAllProjectTeam)
router.post("/create",projectTeamController.projectTemeCreateWithMicro)
router.put("/add/resource-micro",projectTeamController.resourceAddInProjectTeamWithMicro)
module.exports = router;