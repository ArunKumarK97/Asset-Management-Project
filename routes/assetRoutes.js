const express = require('express');
const router = express.Router();
const controller = require('../controllers/assetController');

router.get('/', controller.getAll);
router.get('/form/:id?', controller.getForm);
router.post('/save', controller.createOrUpdate);
router.get('/delete/:id', controller.delete);

module.exports = router;
