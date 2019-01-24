var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {
  var token = req.headers['authorization'].split(' ')[1];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    req.currentUser = jwt.decode(token)
    next();
  });
}
module.exports = verifyToken;
