// middlewares/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized: no token' });

  try {
    const payload = jwt.verify(token, config.ACCESS_SECRET); // { id, role }
    req.user = payload;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: 'Forbidden: requires role ' + role });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
