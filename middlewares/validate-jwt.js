const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const validateJWT = async(req = request, res = response, next) => {
    // Read token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'Token is required'
        });
    }

    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        // Read user from DB with uid
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(401).json({
                // user does not exist in DB
                msg: 'Invalid token'
            });
        }

        // Verify if user with id has state: true
        if (!user.state) {
            return res.status(401).json({
                // user state: false
                msg: 'Invalid token'
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid token'
        });
    }
}

module.exports = {
    validateJWT
}