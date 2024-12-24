const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

//register a new user
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password is required'),
  ],
  userController.registerUser
);

//login a user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password is required'),
  ],
  userController.loginUser
);

//get all users profile  authMiddleware
router.get('/profile', authMiddleware.authUser, userController.getUsersProfile);

//logout a user
router.post('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
 