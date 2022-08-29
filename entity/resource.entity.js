const mongoose = require("mongoose");
const resource = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  status: {type: Boolean,default: false},
  hasUserChangedInitialPWD:{type: Boolean,default: false},
  insertedAt:{type: Date},
  insertedBy:{type:String},
  loggedinDatetime:{type:Date},
  role:{type:String,require:true},
  updateAt:{type: Date, },
  updateBy:{type:String,}
});
module.exports = mongoose.model("resource", resource);
