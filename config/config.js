const dotenv=require('dotenv')
dotenv.config();
const DB=process.env.MONGODB_URL;
const PORT=process.env.PORT;
// const EMAILPASSWORD=process.env.EMAILPASSWORD

module.exports ={DB,PORT}