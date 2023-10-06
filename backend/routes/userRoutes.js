const express = require('express');
const { registerUser, loginUser, googleSignUp } = require('../controllers/userController');

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.route("/googleSignUp").get(googleSignUp);

module.exports = router;