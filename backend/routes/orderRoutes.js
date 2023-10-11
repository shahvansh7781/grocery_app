const express = require('express');
const { createOrder, myWebhook, getAllOrders, getUserOrder } = require('../controllers/orderController');

const router = express.Router();

router.route("/createOrder").post(createOrder);
router.route("/stripe").post(myWebhook);
router.route("/getAllOrders").get(getAllOrders);
router.route("/getUserOrder").get(getUserOrder);

module.exports = router;