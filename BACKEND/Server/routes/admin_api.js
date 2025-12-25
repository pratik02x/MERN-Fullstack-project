const express = require("express")
const router = express.Router();

const{authorization}=require("../utils/auth")
const pool = require("../db/pool")
const result= require("../utils/result")
const {error} =require("node:console")


//admin_api1
router.get("/course/all-courses",(req,res) =>{
    const {start_date, end_date} = req.query
    const sql=`select * from courses`
    pool.query(sql,(error,data)=>{
        
        if(error){
            return res.send(result.createResult(error))
        }
       
        else if(data.length==0){
            res.send(result.createResult("No courses available"))
        }
        res.send(result.createResult("null",data))
    })
})


//admin api2
router.post("/course/add",authorization,(req,res) =>{
    const {course_id,course_name, description, fees,start_date, end_date,video_expire_days}=req.body

    const sql =`insert into courses (course_id,course_name, description, fees,start_date, end_date,video_expire_days) values (?,?,?,?,?,?,?)`
    pool.query(sql,[course_id,course_name, description, fees,start_date, end_date,video_expire_days],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})


//admin api3
router.put("/course/update/:course_id",authorization,(req,res)=>{
    const{course_id}=req.params
    const{course_name, description, fees,start_date, end_date,video_expire_days} =req.body
    const sql=`UPDATE courses SET course_name=?,description=?,fees=?,start_date=?,end_date=?,video_expire_days=? WHERE 
    course_id=? `;
    pool.query(sql,[course_name,description,fees,start_date,end_date,video_expire_days,course_id],(error,data)=>{
        if(error)
        {
            res.send(result.createResult(error))
        }
        else if(data.affectedRows==0)
        {
            res.send(result.createResult("data not found"))
        }
        else
        {
            res.send(result.createResult(null,data))
        }
    })
})


//admin api4
router.delete("/course/delete/:course_id",authorization,(req,res)=>{
    const{course_id}=req.params
    const sql=`delete from courses where course_id=?`;
    pool.query(sql,[course_id],(error))
})

module.exports=router;