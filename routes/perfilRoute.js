const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController')


router.get('/', perfilController.perfil);
router.get('/atualizarPerfil', perfilController.atualizarPerfil);
router.get('/alterarSenha', perfilController.alterarSenha);


module.exports = router;