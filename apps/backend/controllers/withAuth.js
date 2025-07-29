// utils/getUserFromAuth.js
const jwt = require('jsonwebtoken');
const config = require('../config');
const Controller = require('./Controller');
const AppError = require('../utils/error');


function withAuth(serviceOperation, role) {
  return async (request, response) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Unauthorized: no token', 401)
    }

    const token = authHeader.split(' ')[1];
    let user;
    
    try {
      user = jwt.verify(token, config.ACCESS_SECRET);
    } catch (e) {
      throw new AppError('Unauthorized: invalid token', 401)
    }
    
    if (role && user.role !== role) {
      throw new AppError('Forbidden: insufficient role', 403)
    }
    
    return serviceOperation({...request, user}, response);
  };
}

module.exports = withAuth;