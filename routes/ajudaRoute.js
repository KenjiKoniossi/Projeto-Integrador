const express = require('express');
const router = express.Router();
const ajudaController = require('../controllers/ajudaController')


router.get('/', ajudaController.viewForm);

module.exports = router;
