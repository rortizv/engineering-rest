const jwt = require('jsonwebtoken');

// Generate JWT
const generateJWT = (id) => {    
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, process.env.SECRET_KEY, {
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