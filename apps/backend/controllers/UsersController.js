/**
 * The UsersController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/UsersService');
const withAuth = require('./withAuth');

const getAllUsers = async (request, response) => {
  await Controller.handleRequest(request, response, withAuth(service.getAllUsers));
};

const getUserById = async (request, response) => {
  await Controller.handleRequest(request, response, withAuth(service.getUserById));
};

const patchUserById = async (request, response) => {
  await Controller.handleRequest(request, response, withAuth(service.patchUserById, 'admin'));
};

const deleteUserById = async (request, response) => {
  await Controller.handleRequest(request, response, withAuth(service.deleteUserById, 'admin'));
};


module.exports = {
  deleteUserById,
  getAllUsers,
  getUserById,
  patchUserById,
};
