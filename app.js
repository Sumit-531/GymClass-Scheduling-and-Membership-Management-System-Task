require("dotenv").config({path: `${process.cwd()}/.env`})
const express = require("express");

const authRouter = require("./route/authRoute.js");
const catchAsync = require("./utils/catchAsync.js");
const AppError = require("./utils/appError.js");
const { stack } = require("sequelize/lib/utils");
const globalErrorHandler = require("./controller/errorController.js")
const app = express();

// will do conversion in json format
app.use(express.json());


// all router will be here
app.use("/api/v1/auth", authRouter);



// if no route match
app.use("*", 
    catchAsync (async(req, res, next) =>{
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    
}));

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port 3000.`);
});