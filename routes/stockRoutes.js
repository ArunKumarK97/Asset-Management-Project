const express = require('express');
const router = express.Router();
const controller = require('../controllers/stockController');

router.get('/', controller.getStockView);

module.exports = router;
