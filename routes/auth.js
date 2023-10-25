const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields } = require('../middlewares/validate-fields');

// Controllers
const { login, register, validateJWT } = require('../controllers/auth');


const router = Router();


router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).not(),
    validateFields
], login);

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).not(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], register);

router.post('/validate-token', validateJWT);

module.exports = router;