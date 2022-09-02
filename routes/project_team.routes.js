const express=require('express')
const router=express.Router()
const projectTeamController=require("../controller/project_team.controller")

router.post("/create",projectTeamController.projectTemeCreate)
router.put("/add/resource",projectTeamController.resourceAddInProjectTeam)
router.get("/",projectTeamController.getAllProjectTeam)
router.post("/create-micro",projectTeamController.projectTemeCreateWithMicro)

module.exports = router;