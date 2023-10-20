const express = require('express');
const { getUserReport, groceryReport, orderReport } = require('../controllers/reportController');
const router = express.Router();

router.route("/userReport").post(getUserReport);
router.route("/groceryReport").post(groceryReport);
router.route("/orderReport").post(orderReport);

module.exports = router;