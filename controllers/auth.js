const { response } = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Verify if email exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                msg: 'User or Password are not correct'
            });
        }

        // Verify if user is active
        if (!user.state) {
            return res.status(400).json({
                msg: 'User or Password are not correct'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User or Password are not correct'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        // Remove password from user
        let loggedUser = { ...user.toJSON() };
        delete loggedUser.password;

        res.json({
            msg: 'Login successfully',
            token,
            loggedUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
};

const register = async (req, res = response) => {
    const { name, email, password } = req.body;

    try {
        // Verify if email exists
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({
                msg: 'Email already exists'
            });
        }

        // Create user
        const newUser = new User({ name, email, password });

        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        newUser.password = bcryptjs.hashSync(password, salt);

        // Save user in DB
        await newUser.save();

        // Generate JWT
        const token = await generateJWT(newUser.id);

        // Remove password from user
        let loggedUser = { ...newUser.toJSON() };
        delete loggedUser.password;

        res.json({
            msg: 'User created successfully',
            token,
            loggedUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

const validateJWT = async (req, res = response) => {
    const savedToken = req.body.token;
    if (savedToken) {
        // check if token is a valid token
        try {
            const { id } = jwt.verify(savedToken, process.env.SECRET_KEY);
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

            res.json({
                user
            });
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }
    } else {
        console.log("There's no token in local storage");
    }
};

module.exports = {
    login,
    register,
    validateJWT
};