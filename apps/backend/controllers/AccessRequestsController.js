/**
 * The AccessRequestsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/AccessRequestsService');
const withAuth = require('./withAuth');

const getAllAccessRequests = async (request, response) => {
  await Controller.handleRequest(request, response, withAuth(service.getAllAccessRequests, 'admin'));
};

const patchAccessRequest = async (request, response) => {
  await Controller.handleRequest(request, response, withAuth(service.patchAccessRequest, 'admin'));
};

const postAccessRequest = async (request, response) => {
  await Controller.handleRequest(request, response, withAuth(service.postAccessRequest));
};


module.exports = {
  getAllAccessRequests,
  patchAccessRequest,
  postAccessRequest,
};
