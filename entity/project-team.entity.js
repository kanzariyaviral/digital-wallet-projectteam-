const mongoose = require("mongoose");
const projectTeam = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  projectTeamName: { type: String, required: true },
  resourceIds:[{ type: mongoose.Types.ObjectId, ref: 'resource' }],
});
module.exports = mongoose.model("projectTeam", projectTeam);
