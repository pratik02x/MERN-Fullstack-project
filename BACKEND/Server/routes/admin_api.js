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

//fetch all videos
// fetch all courses (authorized)
router.get("/course/all", authorization, (req, res) => {

  const sql = `SELECT * FROM courses`

  pool.query(sql, (error, data) => {
    if (error) {
      return res.send(result.createResult(error))
    }

    res.send(result.createResult(null, data))
  })
})


//add a new video for course
router.post("/video/add",authorization,(req,res)=>{
    const {course_id, title, description,youtube_url,added_at}=req.body;
    const sql=`INSERT INTO videos(course_id, title, description,youtube_url,added_at) VALUES(?,?,?,?,?)`;
    pool.query(sql,[course_id, title, description,youtube_url,added_at],(error,data)=>{
        res.send(result.createResult(error,data));
    })

 }
)

//update video details by video id
router.put("/video/update/:video_id",authorization,(req,res)=>{
    const {video_id}=req.params;
    const {course_id, title,description,youtube_url,added_at}=req.body;
    const sql=`UPDATE videos SET course_id=?, title=?,description=?,youtube_url=?,added_at=?  WHERE video_id=?`;
    pool.query(sql,[course_id, title,description,youtube_url,added_at,video_id],(error,data)=>{
        if(error){
            return res.send(result.createResult(error));
        }
        else if(data.affectedRows==0){
            return res.send(result.createResult("video not found"));
        }
        res.send(result.createResult(null,data));
    })
 }
)

//delete a video by video id
router.delete("/video/delete/:video_id",authorization,(req,res)=>{
    const{video_id}=req.params;
    const sql=`DELETE FROM videos WHERE video_id=?`;
    pool.query(sql,[video_id],(error,data)=>{
        if(error){
            return res.send(result.createResult(error));
        }
        else if (data.affectedRows==0){
             return res.send(result.createResult("Invalid video Id"));
        }
        res.send(result.createResult(null,data));
    })
})

//get all students enrolled to course by course id
router.get("/enrolled/students",authorization,(req,res)=>{
    const{course_id}=req.query;
    const sql=`SELECT * FROM students WHERE course_id=?`;
    pool.query(sql,[course_id],(error,data)=>{
        res.send(result.createResult(null,data));
    })
})


module.exports=router;