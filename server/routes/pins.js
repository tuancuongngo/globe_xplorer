const router = require("express").Router();

const Pin = require("../models/pin");

// Add new Pin to DB
router.post("/", async (req, res) => {
    const newPin = new Pin(req.body);

    try {
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
        console.log("[SUCCESS] Adding new Pin to DB.");
    } catch (err) {
        res.status(500).json(err);
        console.log("[FAILED] Adding new Pin to DV.");
    }
});

// Get all Pins
router.get("/", async (req, res) => {
    try {
        const pinList = await Pin.find({});
        res.status(200).json(pinList);
        console.log("[SUCCESS] Retrieving all Pins.");
    } catch (err) {
        res.status(500).json(err);
        console.log("[FAILED] Retrieving all Pins.");
    }
});

module.exports = router;
