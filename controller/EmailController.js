const userAuth = require('../model/userModel');
const bcyrpt = require('bcrypt');
const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const templatePath = path.join(__dirname, '../htmlTem/template.html');
const template = fs.readFileSync(templatePath, 'utf8');
const templatePath2 = path.join(__dirname, '../htmlTem/temp2.html');
const template2 = fs.readFileSync(templatePath2, 'utf8');
const moment = require('moment');
require('dotenv').config(); 
const cron = require('node-cron')
const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
   tls:{
    rejectUnauthorized : false
   }
});


const signUp =  async (req, res) => {

    try {
        const { userName, userEmail, userPassword, role } = req.body;

        if (!userName || !userEmail || !userPassword || !role) {
            return res.status(500).json({
                Error: "user not entered userName or userEmail or userPassword or role "
            });
        }

        const hashPassword = await bcyrpt.hash(userPassword, 10);

        const user = await userAuth.createUser(userName, userEmail, hashPassword, role);

        await transporter.sendMail({
            from:process.env.EMAIL_USER ,
            to: userEmail,
            subject: 'Welcome to info tech',
            html: template.replace('{{username}}', userName)
        });

     const shTime = moment();
     shTime.add(3,'minute') 
     const cronExpre = `${shTime.minute()}} ${shTime.hour()} * * * `;

      const job = cron.schedule(cronExpre,async() => {
        await transporter.sendMail({
            from:process.env.EMAIL_USER ,
            to: userEmail,
            subject: 'Thanks message',
            html: template2.replace('{{username}}', userName)
        });
        job.stop()
    })

        console.log('Sign-up successful! Email sent.');
        res.status(201).json({ message: "Sign-up successful", user });

    } catch (error) {
        console.error("Error during signup:", error);

        if (error.name === "SequelizeValidationError") {
            const validationErrors = error.errors.map((e) => e.message);
            return res.status(400).json({ error: validationErrors });
        } else if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({ error: "User with this email already exists." });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {signUp} 