const express = require('express');
const routes = express.Router();
const userController = require('../controller/User');
const fetchuserDetails = require('../middleware/fetchUser');

routes
  .post('/createUser', userController.signUpUser)
  .post('/login', userController.loginUser)
  .get('/getUsers/:id', userController.getUsers)
  .put('/editUser/:id', fetchuserDetails.fetchUser, userController.editUser)
  .get('/getUser/:id', fetchuserDetails.fetchUser, userController.getUser)


exports.routes = routes;
