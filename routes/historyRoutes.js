const express = require('express');
const router = express.Router();
const controller = require('../controllers/historyController');

router.get('/', controller.getAssetList);
router.get('/:id', controller.getHistory);

module.exports = router;
