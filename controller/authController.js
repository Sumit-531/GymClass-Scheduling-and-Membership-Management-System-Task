const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const signup = catchAsync (async (req, res, next) =>{
    const body = req.body;

    // only Trainer and Trainee can do the signup
    if(!["1", "2"].includes(body.userType)){
        // error response
        throw new AppError("Invalid User Type");
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

    const result = newUser.toJSON();

    // checking condition
    if(!result){
        // error response
        return next(new AppError("Failed to create new user.", 400));
   }

    delete result.password;
    delete result.deletedAt;

    // Json Web token that will be send back to the user.
    result.token = generateToken({
        id: result.id,
    });


    

    return res.status(201).json({
        status: "success",
        data: result,
    });
});

const login = catchAsync (async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return next(new AppError("Please provide email and password.", 400));
    }

    //fetch the user from database
    const result = await user.findOne({where: { email }});
    //compare email, password and match
    if(!result || !(await bcrypt.compare(password, result.password))){
        return next(new AppError("Incorrect email or password.", 401));
    }

    // generate token
    const token = generateToken({
        id: result.id,
    });

    return res.json({
        status: "success",
        token,
    });
});

const authentication = catchAsync(async (req, res, next) => {
    // 1. get the token from headers
    let idToken = '';
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        // Bearer asfdasdfhjasdflkkasdf
        idToken = req.headers.authorization.split(' ')[1];
    }
    if (!idToken) {
        return next(new AppError('Please login to get access', 401));
    }
    // 2. token verification
    const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
    // 3. get the user detail from db and add to req object
    const freshUser = await user.findByPk(tokenDetail.id);

    if (!freshUser) {
        return next(new AppError('User no longer exists', 400));
    }
    req.user = freshUser;
    return next();
});

const restrictTo = (...userType) => {
    const checkPermission = (req, res, next) => {
        if (!userType.includes(req.user.userType)) {
            return next(
                new AppError(
                    "You don't have permission to perform this action",
                    403
                )
            );
        }
        return next();
    };

    return checkPermission;
};

module.exports = { signup, login, authentication, restrictTo };