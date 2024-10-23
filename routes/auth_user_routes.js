const express = require("express");
const User = require("../models/user_model");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

authRouter.post("/api/signup", async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            up,
            numTag
        } = req.body;

        const existingEmail = await User.findOne({
            email
        });
        if (existingEmail) {
            return res.status(400).json({
                msg: "email ja existe"
            });
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);
            let user = new User({
                fullName,
                email,
                password: hashedPassword,
                up,
                numTag
            });
            user = await user.save()
            res.json({
                user
            });
        }
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
});

authRouter.post("/api/signin", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const findUser = await User.findOne({
            "email": email
        });
        if (!findUser) {
            return res.status(400).json({
                msg: "Email não encontrado"
            });
        } else {
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (!isMatch) {
                return res.status(400).json({
                    msg: "Password incorreto"
                });
            } else {
                const token = jwt.sign({
                    id: findUser._id
                }, "passwordKey");
                const {
                    password,
                    ...userWithoutPassword
                } = findUser._doc;
                res.json({
                    token,
                    ...userWithoutPassword
                });
            }
        }
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

module.exports = authRouter;