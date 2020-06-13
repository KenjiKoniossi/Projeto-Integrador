const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const path = require('path');
const multer = require('multer');
const enviarProblemaController = require('../controllers/enviarProblemaController')
const {check, validationResult, body} = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public','images_problemas'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
  });
const upload = multer({ storage: storage })

router.get('/', auth, enviarProblemaController.viewForm);
router.post('/', auth, upload.any(), [
  check('problema').not().isEmpty().withMessage('Você deve selecionar um opção na <strong>Seleção do Problema</strong>.'),
  check('problema_outro').if(check('problema').equals('Outro'))
  .not().isEmpty().withMessage('Você selecionou a opção <strong>"Outro"</strong>, a caixa de texto desta opção deve ser preenchida.'),

  check('cep').not().isEmpty().withMessage('Você deve preencher o <strong>CEP</strong>.')
  .custom(valor => /^[0-9]{8}$/.test(valor.replace(/\D/g, ''))).withMessage('Você deve inserir um <strong>CEP</strong> com 8 digitos.'),

  check('rua').not().isEmpty().withMessage('Você deve preencher o nome da <strong>Rua</strong>.'),
  check('bairro').not().isEmpty().withMessage('Você deve preencher o nome do <strong>Bairro</strong>.'),
  check('numero').not().isEmpty().withMessage('Você deve preencher o <strong>Número</strong> ou <strong>"SN"</strong> (sem número).'),
  check('cidade').not().isEmpty().withMessage('Você deve preencher o nome da <strong>Cidade</strong>.'),
  check('estado').not().isEmpty().withMessage('Você deve preencher o nome do <strong>Estado</strong>.'),

], enviarProblemaController.envioProb)

//Rotas para o envio de problema e salva em JSON, dasatualizado
// router.post('/', upload.any(), enviarProblemaController.envioProblema)

module.exports = router;