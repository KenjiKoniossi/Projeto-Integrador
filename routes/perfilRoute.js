const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController')


router.get('/', perfilController.perfil);
router.get('/atualizarPerfil', perfilController.atualizarPerfil);


module.exports = router;