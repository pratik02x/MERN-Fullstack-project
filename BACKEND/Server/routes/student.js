//student
const express = require("express");
const result = require("../utils/result");
const pool = require("../db/pool");
const crypto = require("crypto-js");

const router = express.Router();

// add a student to a course
router.post("/register-to-course", (req, res) => {

    const { name, email, course_id, mobile_no } = req.body;

    // step 1 check if user exists
    const usersql = "SELECT * FROM users WHERE email=?";
    pool.query(usersql, [email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error));
        }

        // if user does not exist
        if (data.length == 0) {
            const password = "sunbeam";
            const hashedpassword = crypto.SHA256(password).toString();
            const role = "student";

            const uusersql = `INSERT INTO users(email,password,role) VALUES(?,?,?)`;
            pool.query(uusersql, [email, hashedpassword, role], (error) => {
                if (error) {
                    return res.send(result.createResult(error));
                }

                const sql = `INSERT INTO students(name,email,course_id,mobile_no) VALUES(?,?,?,?)`;
                pool.query(sql, [name, email, course_id, mobile_no], (error, data) => {
                    if (error) {
                        return res.send(result.createResult(error));
                    }
                    res.send(result.createResult(null, data));
                });
            });
        }
        // if user already exists
        else {
            const sql = `INSERT INTO students(name,email,course_id,mobile_no) VALUES(?,?,?,?)`;
            pool.query(sql, [name, email, course_id, mobile_no], (error, data) => {
                if (error) {
                    return res.send(result.createResult(error));
                }
                res.send(result.createResult(null, data));
            });
        }
    });
});

// update password
router.put("/changepassword", (req, res) => {
    const { newpassword, confirmpassword } = req.body;
    const email = req.headers.email;

    if (newpassword != confirmpassword) {
        return res.send(result.createResult("passwords do not match"));
    }

    const hashedpassword = crypto.SHA256(newpassword).toString();
    const sql = `UPDATE users SET password=? WHERE email=?`;

    pool.query(sql, [hashedpassword, email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error));
        }
        else if (data.affectedRows == 0) {
            return res.send(result.createResult("Invalid credential"));
        }
        res.send(result.createResult(null, data));
    });
});

// get all registered courses of a student
router.get("/my-courses", (req, res) => {
    const email = req.headers.email;

    const sql = `
        SELECT c.course_id, c.course_name, c.image
        FROM courses c
        INNER JOIN students s ON s.course_id = c.course_id
        WHERE s.email = ?
    `;

    pool.query(sql, [email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error));
        }
        else if (data.length === 0) {
            return res.send(result.createResult("No courses Registered", []));
        }
        res.send(result.createResult(null, data));
    });
});

// my-course with videos
router.get("/my-coursewith-videos", (req, res) => {
    const email = req.headers.email;

    const sql = `
        SELECT 
            c.course_id,
            c.course_name,
            v.video_id,
            v.title,
            v.youtube_url
        FROM students s
        INNER JOIN courses c ON s.course_id = c.course_id
        INNER JOIN videos v ON c.course_id = v.course_id
        WHERE s.email = ?
    `;

    pool.query(sql, [email], (error, data) => {
        if (error) {
            return res.send(result.createResult(error));
        }
        res.send(result.createResult(null, data));
    });
});

module.exports = router;
