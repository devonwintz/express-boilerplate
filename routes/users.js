const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

//CREATE A USER
router.post("/signup", async(req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user.length >= 1) {
            res.status(422).json({ message: "Email already exists." });
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);

            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
            });
            newUser.save();
            res.status(201).json({
                message: "User was successfully created",
                CreatedUser: {
                    _id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    request: {
                        type: "GET",
                        url: "http://localhost:8000/users/" + newUser._id,
                    },
                },
            });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//USER LOGIN
router.post("/login", async(req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user.length < 1) {
            return res.status(401).json({ message: "Auth failed." });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({ message: "Auth failed." });
            }
            if (result) {
                const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id,
                    },
                    process.env.JWT_KEY, {
                        expiresIn: "1h",
                    }
                );
                return res.status(200).json({
                    message: "Auth was successful",
                    token: token,
                });
            }
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//GET ALL USERS
router.get("/users", async(req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//GET A USER
router.get("/users/:id", async(req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//DELETE A USER
router.delete("/users/:id", async(req, res) => {
    const id = req.params.id;
    try {
        await User.remove({ _id: id });
        res.status(200).json({
            message: "User with id: " + id + " was successfully deleted",
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

//UPDATE A USER
router.patch("/users/:id", async(req, res) => {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");

    const id = req.params.id;
    try {
        const updatedUser = await User.updateOne({ _id: id }, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: salt + "$" + hash,
                permissionLevel: req.body.permissionLevel,
            },
        });
        res.status(200).json({
            message: "User was successfully updated",
            UpdatedUser: {
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                request: {
                    type: "GET",
                    url: "http://localhost:8000/" + updatedUser._id,
                },
            },
        });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;