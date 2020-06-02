const express = require('express');
const router = express.Router();
const paginaInicialController = require('../controllers/paginaInicialController')


router.get('/', paginaInicialController.viewForm);
router.post('/', paginaInicialController.enviarProblema)

module.exports = router;