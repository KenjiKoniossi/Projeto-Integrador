const express = require('express');
const router = express.Router();
const cadastroController = require('../controllers/cadastroController')


router.get('/', cadastroController.view);
router.post('/', cadastroController.store);
router.get('/recuperarSenha', cadastroController.recuperarSenha);


module.exports = router;