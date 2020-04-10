const express = require('express');
const router = express.Router();
const enviarProblemaController = require('../controllers/enviarProblemaController')


router.get('/', enviarProblemaController.viewForm);

module.exports = router;