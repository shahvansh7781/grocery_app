const express = require('express');
const { getUserReport, groceryReport, orderReport, generateInvoice } = require('../controllers/reportController');
const router = express.Router();

router.route("/userReport").post(getUserReport);
router.route("/groceryReport").post(groceryReport);
router.route("/orderReport").post(orderReport);
router.route("/generateInvoice").post(generateInvoice);

module.exports = router;