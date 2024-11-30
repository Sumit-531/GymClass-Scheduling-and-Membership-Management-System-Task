require("dotenv").config({path: `${process.cwd()}/.env`})
const express = require("express");

const authRouter = require("./route/authRoute.js")
const app = express();

// creating a route to check
app.get("/", (req, res) =>{
    res.status(200).json({
        status: "success",
        message: "REST APIs are working"
    });
});

// all router will be here
app.use("/api/v1/auth", authRouter);



// if no route match
app.use("*", (req, res, next) =>{
    res.status(404).json({
        status: "fail",
        message: "Route not found",
    });
});

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port 3000.`);
});