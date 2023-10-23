const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

// Helpers
const { emailAlreadyExists, idExists } = require('../helpers/db-validators');

// Controllers
const { getUsers,
        createUser,
        updatePutUser,
        updatePatchUser,
        deleteUser } = require('../controllers/users');

const router = Router();


router.get('/', [
        validateJWT
], getUsers);

router.post('/', [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }).not(),
        check('password', 'Password is required').not().isEmpty(),
        check('email').custom(emailAlreadyExists),
        validateFields
], createUser);

router.put('/:id', [
        validateJWT,
        check('id').custom(idExists),
        validateFields
], updatePutUser);

router.patch('/:id', updatePatchUser);

router.delete('/:id', [
        validateJWT,
        check('id').custom(idExists),
        validateFields
], deleteUser);

module.exports = router;