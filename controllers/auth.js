const { response } = require('express');
const bcryptjs = require('bcryptjs');
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

module.exports = {
    login
};