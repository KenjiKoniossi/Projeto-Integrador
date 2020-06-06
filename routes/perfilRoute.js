const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const path = require("path");
const multer = require("multer");
const perfilController = require('../controllers/perfilController');


router.get('/', auth, perfilController.perfil);
router.get('/atualizarPerfil', perfilController.atualizarPerfil);
router.get('/alterarSenha', perfilController.alterarSenha);
router.get('/excluirPerfil', perfilController.excluirConta);


module.exports = router;