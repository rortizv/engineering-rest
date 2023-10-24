const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

const validateJWTonLoad = async (req, res = response) => {
    // Read token from body
    const token = req.body.token;

    if (!token) {
        return res.json({
            msg: 'No token',
        });
    }

    try {
        // Validate if token is valid
        const { id } = jwt.verify(token, secret);

        // If the token is valid, call renewToken
        renewToken(token)
            .then((newToken) => {
                return res.json({
                    msg: 'Token renewed',
                    newToken,
                });
            })
            .catch((error) => {
                console.log(error);
                return res.json({
                    msg: 'Token renewal failed',
                });
            });
    } catch (error) {
        console.log(error);
        return res.json({
            msg: 'Token validation failed',
        });
    }
};

renewToken = (token) => {
    return new Promise((resolve, reject) => {
        const { id } = jwt.verify(token, secret);
        const payload = { id };
        jwt.sign(payload, secret, {
            expiresIn: '2h',
        }, (err, newToken) => {
            if (err) {
                console.log(err);
                reject('Token could not be generated');
            } else {
                resolve(newToken);
            }
        });
    });
}

module.exports = {
    validateJWTonLoad,
};