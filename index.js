const express = require("express");
const bodyParser = require('body-parser');
const db = require('./db');
require('dotenv').config();
const authRouter = require("./routers/userRouter");


const passport = require('./middleware/passport');
const localAuthiddleware = passport.authenticate('local',{session:false});
const app = express();
const PORT = process.env.PORT;
const logRequest = (req,res,nex) =>{
    console.log(`[${new Date().toLocaleTimeString()}] Request Made to ${req.originalUrl}`);
    nex();
}
app.listen(PORT);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(logRequest);
app.use("/auth",authRouter)

app.get("/",localAuthiddleware, (req,res)=>{
    res.send("Hello World");
})