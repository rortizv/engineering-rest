const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');


const getUsers = async (req, res = response) => {
    try {
        const { limit = 15, from = 0 } = req.query;

        // Find all users
        const users = await User.findAll({
            offset: Number(from),
            limit: Number(limit),
        });

        // remove password from users
        users.forEach(user => {
            delete user.dataValues.password;
        });

        // Count total users
        const total = await User.count({ where: { state: true } });

        res.status(200).json({
            total,
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


const createUser = async (req, res = response) => {
    try {
        const { name, email, password } = req.body;

        // Encrypt password
        const salt = bcryptjs.genSaltSync();
        const hashedPassword = bcryptjs.hashSync(password, salt);

        // Create a new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // generate jwt
        const token = await generateJWT(user.id);

        // Show user in response without password
        delete user.dataValues.password;

        res.status(201).json({
            msg: 'User created successfully',
            token,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


const updatePutUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { password, ...rest } = req.body;

        if (password) {
            // Encrypt password
            const salt = bcryptjs.genSaltSync();
            rest.password = bcryptjs.hashSync(password, salt);
        }

        // Update the user by ID
        const user = await User.update(rest, {
            where: { id },
        });

        res.status(200).json({
            msg: `User with ID ${id} was updated successfully`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


const updatePatchUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const body = req.body;

        // Update the user by ID using partial data
        const user = await User.update(body, {
            where: { id },
        });

        res.status(200).json({
            msg: `User with ID ${id} was updated successfully`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


const deleteUser = async (req, res = response) => {
    try {
        const { id } = req.params;

        // Strong Delete the user by ID - user is destroyed from DB
        const user = await User.destroy({ where: { id } });

        res.json({
            msg: 'User was permantently deleted'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


const permanentDeleteUser = async (req, res = response) => {
    
}


module.exports = {
    getUsers,
    createUser,
    updatePutUser,
    updatePatchUser,
    deleteUser,
    permanentDeleteUser
}