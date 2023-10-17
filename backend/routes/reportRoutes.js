const express = require('express');
const { getUserReport } = require('../controllers/reportController');
const router = express.Router();

router.route("/userReport").post(getUserReport);

module.exports = router;