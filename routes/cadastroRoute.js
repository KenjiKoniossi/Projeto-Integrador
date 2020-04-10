const express = require('express');
const router = express.Router();
const cadastroController = require('../controllers/cadastroController')


router.get('/', cadastroController.cadastro);
router.get('/novaConta', cadastroController.novaConta);
router.get('/login', cadastroController.login);
router.get('/recuperarSenha', cadastroController.recuperarSenha);


module.exports = router;