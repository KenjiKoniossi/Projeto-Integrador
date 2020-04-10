const express = require('express');
const router = express.Router();
const saibaMaisController = require('../controllers/saibaMaisController')


router.get('/', saibaMaisController.viewForm);

module.exports = router;