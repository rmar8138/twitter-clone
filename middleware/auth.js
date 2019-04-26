const jwt = require('jsonwebtoken');
const config = require('config');

const accessAuthRoute = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('secret'));

    // If verified, set user id payload to req
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }

  // // Verify token
  // jwt.verify(token, config.get('secret'), (err, decoded) => {
  //   if (err) {
  //     return res.status(401).json({ msg: err.message });
  //   } else {
  //     // If verified, set user id payload to req
  //     req.user = decoded.id;
  //     next();
  //   }
  // });
};

module.exports = accessAuthRoute;
