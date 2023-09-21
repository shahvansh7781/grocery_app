const express = require('express');
const { createGrocery, getGrocery, editGrocery, deleteGrocery } = require('../controllers/groceryController');

const router = express.Router();
router.route("/addGrocery").post(createGrocery);
router.route("/getGrocery").get(getGrocery);
router.route("/editGrocery").patch(editGrocery);
router.route("/deleteGrocery").delete(deleteGrocery);
module.exports=router;