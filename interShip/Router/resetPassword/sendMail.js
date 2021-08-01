const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            //secure: true,
            auth: {
                user: "5d6a2e7a37a182",
                pass: "8fbe387bed5196"
            },
        });

        await transporter.sendMail({
            from: "chillKid@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;