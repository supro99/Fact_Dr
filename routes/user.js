var express = require('express');
var router = express.Router();
var userServices = require('../services/userServices');
var VerifyToken = require('../auth/verifyToken');

/* GET users listing. */
// Create user.
router.post('/signup', userServices.userSignup);

//User Login API
router.post('/login', userServices.userLogin);

//Get userInfo API
router.get('/', VerifyToken, userServices.getUserDetails);

//Update userInfo API
router.patch('/', VerifyToken, userServices.updateUserDetails);

//Create userInfo API
router.post('/', VerifyToken, userServices.createUserDetails);

//delete userInfo API
router.delete('/', VerifyToken, userServices.deleteUserDetails);

//API to generate bulk users
router.get('/bulk', userServices.generateBulk);

module.exports = router;

