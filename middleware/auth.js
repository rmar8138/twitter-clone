const jwt = require('jsonwebtoken');
const config = require('config');

const accessAuthRoute = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Verify token
  jwt.verify(token, config.get('secret'), (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: err.message });
    } else {
      // If verified, set user id payload to req
      req.body.user = decoded.id;
      next();
    }
  });
};

module.exports = accessAuthRoute;
