const express = require('express');
const router = express.Router();
const controller = require('../controllers/scrapController');

router.get('/', controller.getForm);
router.post('/', controller.scrapAsset);

module.exports = router;
