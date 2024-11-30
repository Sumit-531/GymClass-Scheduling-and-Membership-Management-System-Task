const user = require("../db/models/user");

const signup = async (req, res, next) =>{
    const body = req.body;

    // only Trainer and Trainee can do the signup
    if(!["1", "2"].includes(body.userType)){
        // error response
        return res.status(400).json({
                status: "fail",
                message: "Invalid User Type",
        });
    }

    // insert data
    const newUser = await user.create({
        userType : body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        // only password stored into the database
        password: body.password,
        // confirm password only in signup, not stored in database
        confirmedPassword: body.confirmedPassword,
    });

    // checking condition
    if(!newUser){
         // error response
         return res.status(400).json({
            status: "fail",
            message: "Failed to create new user.",
    });
    }

    return res.status(201).json({
        status: "success",
        data: newUser,
    });
};

module.exports = { signup };