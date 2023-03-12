const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
    try {
        // encrypt password
        const salt = await bcrypt.genSalt(10); // salt to make PW more difficult to guess
        const encryptedPW = await bcrypt.hash(req.body.password, salt); // encrypt the PW through hash with salt

        // create new User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: encryptedPW,
        });

        // write User to DB
        const savedUser = await newUser.save();
        res.status(200).json(savedUser._id);
        console.log("[SUCCESS] Registering new User to DB.");
    } catch (err) {
        res.status(500).json(err);
        console.log("[FAILED] Registering new User to DB.");
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            console.log("[FAILED] Finding User information in DB.");
            res.status(400).json("Wrong username of password.");
        } else {
            // validate password
            const validPW = await bcrypt.compare(req.body.password, user.password);
            if (!validPW) {
                console.log("[FAILED] Finding User information in DB.");
                res.status(400).json("Wrong username of password.");
            } else {
                console.log("[SUCCESS] Finding User information in DB.");
                // res.status(200).json(user);
                res.status(200).json(user.username);
            }
        }
    } catch (err) {
        console.log("[FAILED] Finding User information in DB.");
        res.status(500).json(err);
    }
});

module.exports = router;
