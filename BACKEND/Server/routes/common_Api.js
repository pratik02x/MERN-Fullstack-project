const express=require("express");
const cryptojs=require("crypto-js")
const jwt=require("jsonwebtoken")

const pool=require("../db/pool");
const result=require("../utils/result")
const config=require("../utils/config");
const { error } = require("node:console");


const router=express.Router();
router.post("/auth/login", (req, res) => {
    const { email, password } = req.body;

    const hashedpassword = cryptojs.SHA256(password).toString();
    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    pool.query(sql, [email, hashedpassword], (error, data) => {
        if (error) {
            // Error during database query
            return res.send(result.createResult(error));
        }
        
        if (data.length == 0) {
            // No user found with those credentials
            return res.send(result.createResult("Invalid email or password"));
        }

        // Login Successful
        const user = data[0];

        // 1. Create payload (Remove password for security!)
        const payload = {
            email: user.email,
            role: user.role
        };

        // 2. Generate Token
        const token = jwt.sign(payload, config.SECRET);

        // 3. Prepare response data
        const userdata = {
            role: user.role,
            email: user.email,
            token: token
        };

        // 4. Send response - Pass null for the error parameter
        res.send(result.createResult(null, userdata)); 
    });
});

router.get("/course/all-active-course",(req,res)=>{
    const sql="SELECT * FROM courses WHERE CURRENT_DATE <= end_date";

    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })

})



module.exports=router;