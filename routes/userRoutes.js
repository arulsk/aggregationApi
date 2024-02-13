const express = require('express');
const route = express.Router();
const userController = require('../controller/usercontroller');
const emailController = require('../controller/EmailController')
route.post('/createUser',userController.createUser);
route.post('/signup',emailController.signUp)
route.get('/getUsers',userController.getUsers);
route.get('/getUserById/:id',userController.getUserById);
route.put('/updateUser/:id',userController.updateUsers);
route.delete('/deleteUser/:id',userController.deleteUser);
route.get('/noOfUsers',userController.numberOfUser);
route.get('/getUserWithHighestId',userController.getUserWithHighestId);
route.get('/getUserWithLowestId',userController.getUserWithLowestId);
module.exports = route;