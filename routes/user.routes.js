const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const userController = require('../controllers/user.controller');

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password is required'),
  ],
  userController.registerUser
);

module.exports = router;
