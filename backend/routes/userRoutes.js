const express = require('express');
const { registerUser, loginUser, googleSignUp, loadUser, logout } = require('../controllers/userController');

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/loadUser").get(loadUser);
router.route("/logout").get(logout);
// router.route("/googleSignUp").get(googleSignUp);

module.exports = router;