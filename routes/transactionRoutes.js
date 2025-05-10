const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionController');

router.get('/issue', controller.getIssueForm);
router.post('/issue', controller.issueAsset);

router.get('/return', controller.getReturnForm);
router.post('/return', controller.returnAsset);

module.exports = router;
