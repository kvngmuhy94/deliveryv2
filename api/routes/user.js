const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');


//working done
router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select email, password, role, status from user where email=?"
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                query = "insert into user (name,l_name,contactNumber,email,address,password,status,role) values (?,?,?,?,?,?,'false','user')";
                connection.query(query, [user.name,user.l_name, user.contactNumber, user.email,user.address, user.password], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ massage: "Successfully Registered." });
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ massage: "Email Already Exist." });
            }
        }
        else {
            return res.status(500).json(err);
        }

    })
})

//working done
router.post('/login', (req, res) => {
    const user = req.body;
    query = "select email,password, role, status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ massage: "Incorrect UserName or PassWord" });
            }
            else if (results[0].status === 'false') {
                return res.status(401).json({ massage: "Please Wait for Admin Approval" });
            }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });
            }
            else {
                return res.status(400).json({ massage: "Something went wrong. Please try again later" });
            }


        } else {
            return res.status(500).json(err);
        }
    })
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


router.post('/forgotPassword', (req, res) => {
    const user = req.body;
    query = "select email, password from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(200).json({ message: "Password sent sucessfully to your email user not 1." });
            }
            else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password By Restaurant Mgt Syst.',
                    html: '<p><b> Your Login details for RMS</b> <b>Email: </b>' + results[0].email + '<br> <b>Password</b>' + results[0].password + '<br><a href="http://localhost:4200/"> Click here to login</a></p>'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email Sent:' + info.response);
                    }
                });
                return res.status(200).json({ message: "Password sent sucessfully to your email1." });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.get('/get', auth.autheticateToken, checkRole.checkRole, (req, res) => {
    var query = "select id,name,l_name,email,contactNumber,password,address,status from user where role='user'";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.patch('/update', auth.autheticateToken, checkRole.checkRole, (req, res) => {
    let user = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "user id does not exist." });
            }
            return res.status(200).json({ message: "User Updated Sucessfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/checkToken', auth.autheticateToken, (req, res) => {
    return res.status(200).json({ message: "true" });
})


router.post('/changePassword',auth.autheticateToken, (req, res) => {
    const user = req.body;
    const email = res.locals.email;
    var query = "select * from user where email=? and password=?";
    connection.query(query, [email, user.oldPassword], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(400).json({ message: "Incorrect Old Password" });
            }
            else if (results[0].password == user.oldPassword) {
                query = "update user set password=? where email=?";
                connection.query(query, [user.newPassword, email], (err, results) => {
                    if (!err) {
                        return res.status(200).json({ message: "Password Successfully Updated." })
                    }
                    else {
                        return res.status(500).json(err);
                    }
                })
            }
            else {
                return res.status(400).json({ massage: "Something went wrong. Please try again later" });
            }
        }
        else {
            return res.status(500).json(err);
        }
    })
})
module.exports = router;