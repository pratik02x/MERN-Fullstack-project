const express=require("express");
const cors = require("cors");
const path = require('path');

const app=express();

const {authuser,authorization}=require("./utils/auth");
const commenApi=require("./routes/common_Api");
const adminRouter=require("./routes/Admin");
const studentRouter=require("./routes/student");

<<<<<<< HEAD
//main code
=======
app.use(cors())
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
>>>>>>> 1bec19b8195c37eb6241b5a5b78420cf29fedf7d
app.use(express.json())
app.use(authuser);
// app.use(authorization);
app.use("/common",commenApi);
app.use("/admin",adminRouter);
app.use("/student",studentRouter);

app.listen(4000,"localhost",()=>{
    console.log("server start at port 4000");
})

