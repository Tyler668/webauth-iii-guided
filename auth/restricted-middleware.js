
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //foul play
      } else {
        //token is good
        req.username = decodedToken.username;
        next();
      }
    })
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
