const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/user.controller");

router.post('/signup', user_controller.signup_user);
router.post('/login', user_controller.login_user)

module.exports = router;

