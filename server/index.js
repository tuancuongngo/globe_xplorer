const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();
const path = require("path");

// routes
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

// database
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("[SUCCESS] MongoDB database connection established successfully");
});

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

app.listen(3300, () => {
    console.log("[SUCCESS] Port 3300 active");
});
