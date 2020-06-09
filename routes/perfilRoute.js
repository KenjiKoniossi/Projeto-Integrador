const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const path = require("path");
const multer = require("multer");
const perfilController = require('../controllers/perfilController');


router.get('/', auth, perfilController.perfil);
router.get('/atualizarPerfil', perfilController.atualizarPerfil);
router.put('/atualizarPerfil', perfilController.salvarPerfil);
router.get('/alterarSenha', perfilController.alterarSenha);
router.put('/alterarSenha', perfilController.salvarSenha);
router.get('/excluirPerfil', perfilController.excluirConta);
router.delete('/excluirPerfil', perfilController.salvaExcluirConta);


module.exports = router;