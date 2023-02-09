const express = require('express');
const authController = require('../controllers/dbCalls_MAP')

const router = express.Router();


router.post("/map/showSupermarket", authController.showSupermarket)
router.post("/map/showProducts", authController.showProducts)
router.post("/testAjax", authController.ajaxtest)


module.exports = router;

