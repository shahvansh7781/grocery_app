const express = require('express');
const { createOrder, myWebhook } = require('../controllers/orderController');

const router = express.Router();

router.route("/createOrder").post(createOrder);
router.route("/stripe").post(myWebhook);

module.exports = router;