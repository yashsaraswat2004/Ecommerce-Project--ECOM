import User from "../models/user.models.js";
import emailTemplete from "../views/emailTemplete.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt";
const saltRounds = 10;

dotenv.config({
    path: "./.env"
});

const recoverPassword = async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(404).json({ message: "Empty Fields" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "Email Not Found" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET1, {
            expiresIn: "1h",
        });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const emailTemplate = emailTemplete.resetPassword(user.firstName, 'http://localhost:3000/reset-password', token);

        const mailOptions = {
            from: process.env.SMTP_USERNAME,
            to: email,
            subject: "Reset Password",
            html: emailTemplate,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error while sending email:", error);
                return res.status(500).json({ message: "Error While Sending Email", error });
            } else {
                console.log("Email sent:", info.response);
                return res.status(200).json({ message: "Done", token });
            }
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

const resetPassword = async (req, res) => {
    try {
        const token = req.query.token;
        let userId = '';

        jwt.verify(token, process.env.JWT_SECRET1, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            userId = decoded.userId;
        });

        const { password, confirm_password } = req.body;
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
}


export default { recoverPassword, resetPassword }