const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const enviarProblemaController = require('../controllers/enviarProblemaController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public','images_problemas'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
  });
const upload = multer({ storage: storage })

router.get('/', enviarProblemaController.viewForm);
router.post('/', upload.any(), enviarProblemaController.envioProb)

//Rotas para o envio de problema e salva em JSON, dasatualizado
// router.post('/', upload.any(), enviarProblemaController.envioProblema)

module.exports = router;