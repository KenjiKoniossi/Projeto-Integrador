const express = require('express');
const router = express.Router();
const mapaController = require('../controllers/mapaController')
const {check, validationResult, body} = require('express-validator');

router.get('/', mapaController.viewForm);
router.post('/pesquisa', [
    check('pesquisa').not().isEmpty()
], mapaController.pesquisaEndereco);
router.post('/problemas', [
    check('latitude').isNumeric(),
    check('longitude').isNumeric()
], mapaController.carregaProblemas);

module.exports = router;