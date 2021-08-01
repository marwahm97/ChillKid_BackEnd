const  User  = require('../../models/User')
const sendEmail = require("./sendMail")
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

    

        const link = `${process.env.BASE_URL}/password-reset/${user.email}`;
        await sendEmail(user.email, "Password reset", link);

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});
router.post("/:userId", async (req, res) => {
    try {
        

        const user = await User.findOne(req.params.email);
        if (!user) return res.status(400).send("invalid link or expired");
        

        user.password = req.body.password;
        await user.save();
  

        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

module.exports = router;
