const express = require('express');
const router = express.Router();
const controller = require('../controllers/energyController');

router.get('/', controller.getEnergyData);

module.exports = router;