const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT
const generateJWT = (id = '') => {
    const secretKey = crypto.randomBytes(32).toString('hex');
    
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, secretKey, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token could not be generated');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}