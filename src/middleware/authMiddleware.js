const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const config = require('../config/spotifyConfig');

const client = new OAuth2Client(config.clientId);

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const verifyGoogleToken = async (req, res, next) => {
    const token = req.body.idToken;
    if (!token) return res.status(400).send('Token is required');

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.clientId,
        });
        const payload = ticket.getPayload();
        req.user = payload;
        next();
    } catch (error) {
        return res.status(403).send('Invalid token');
    }
};

module.exports = {
    authenticateToken,
    verifyGoogleToken,
};