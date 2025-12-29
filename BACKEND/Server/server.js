const express=require("express");
const app=express();
const {authuser,authorization}=require("./utils/auth");
const commonApi=require("./routes/common_Api");
const adminRouter=require("./routes/admin_api");
const studentRouter=require("./routes/student");


app.use(express.json())
app.use(authuser);
//app.use(authorization);
app.use("/common",commonApi);
app.use("/admin",adminRouter);
app.use("/student",studentRouter);

app.listen(4000,"localhost",()=>{
    console.log("server start at port 4000");
})

