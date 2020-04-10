const express = require('express');
const router = express.Router();
const mapaController = require('../controllers/mapaController')


router.get('/', mapaController.viewForm);

module.exports = router;