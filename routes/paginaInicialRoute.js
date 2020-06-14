const express = require('express');
const router = express.Router();
const paginaInicialController = require('../controllers/paginaInicialController');
const auth = require("../middlewares/auth");
const path = require("path");
const multer = require("multer");
const {check, validationResult, body} = require('express-validator');

router.get('/', paginaInicialController.viewForm);
router.post('/newsletter', [
    check('email').isEmail()
], paginaInicialController.enviarNewsletter);
router.post('/', [
    check('nomeContato').isLength({min: 3}).withMessage('Mínimo de 3 caracteres em <strong>Nome</strong>.'),
    check('emailContato').isEmail().withMessage('<strong>Email</strong> inválido.'),
    check('mensagemContato').isLength({min: 3}).withMessage('Mínimo de 3 caracteres em <strong>Mensagem</strong>.')
], paginaInicialController.enviarContato)

module.exports = router;