'use strict';

const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config()

/* send email to reset password */
router.post('/', async (req, res, next) => {
    try {

        const emailAddress = req.body.email
        const user = await User.findOne({ email: emailAddress })
        if (user) {
            const emailContent = {
                from: 'flitter@flitter.com',
                to: `${user.email}`,
                subject: 'Reset your Flitter password',
                html: `Hi ${user.name}, <br> Click the following link to reset yout password: <br>
                <a href="http://localhost:3000/reset/">Reset Password</a>` 
            }; //the link should carry the token
            const transport = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            await transport.sendMail(emailContent)
            res.json({message: 'Message sent'})
        } else {
            res.json({message: 'Email not found'})
        };
    } catch (error) {
        next(error)
    }
})

module.exports = router;