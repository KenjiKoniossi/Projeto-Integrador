const express = require('express');
const router = express.Router();
const paginaInicialController = require('../controllers/paginaInicialController')


router.get('/', paginaInicialController.viewForm);

module.exports = router;