const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const path = require("path");
const multer = require("multer");
const perfilController = require('../controllers/perfilController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public','images_avatar'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
  });
const upload = multer({ storage: storage })

router.get('/', auth, perfilController.perfil);
router.get('/atualizarPerfil', perfilController.atualizarPerfil);
router.put('/atualizarPerfil', upload.any(), perfilController.salvarPerfil);
router.get('/alterarSenha', perfilController.alterarSenha);
router.put('/alterarSenha', perfilController.salvarSenha);
router.get('/excluirPerfil', perfilController.excluirConta);
router.delete('/excluirPerfil', perfilController.salvaExcluirConta);
router.get('/problema/:id/resolvido', perfilController.viewProblemaResolvido);
router.put('/problema/:id/resolvido', perfilController.problemaResolvido);
router.get('/problema/:id/apagar', perfilController.viewApagarProblema);
router.delete('/problema/:id/apagar', perfilController.apagarProblema);


module.exports = router;