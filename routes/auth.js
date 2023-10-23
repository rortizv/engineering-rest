const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields } = require('../middlewares/validate-fields');

// Controllers
const { login } = require('../controllers/auth');


const router = Router();


router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).not(),
    validateFields
], login);

module.exports = router;