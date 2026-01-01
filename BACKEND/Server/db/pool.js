//connect database
const mysql2=require("mysql2");
const pool=mysql2.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mproject_db"
})

module.exports=pool;