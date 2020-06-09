const jwt = require('jsonwebtoken');
const secrets = require("../config/secrets.js");

module.exports = {
    generateToken,
    validateUserContent
}

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };
    const options = {
        expiresIn: '1d'
    };
    // console.log(secrets.jwtSecret)
    return jwt.sign(payload,  secrets.jwtSecret, options)
}

function validateUserContent(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400),json({
            message: 'Username & password fields are required'
        })
    } else {
        next();
    }
}