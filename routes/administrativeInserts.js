const express = require('express');
const authController = require('../controllers/dbCalls_CRUD')

const router = express.Router();

router.post("/adminsIndex/categoriesUpload", authController.uploadCategories)
router.post("/adminsIndex/productPrices", authController.uploadPrices)
router.post("/adminsIndex/deleteProductData", authController.nukeTheProductData)
router.post("/adminsIndex/supermarketUpload", authController.uploadSupermarkets)
router.post("/adminsIndex/deleteSupermarketData", authController.nukeTheSupermarketData)

router.post("/testAjax", authController.ajaxtest)


module.exports = router;

