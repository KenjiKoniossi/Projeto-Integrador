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
router.get('/atualizarPerfil', auth, perfilController.atualizarPerfil);
router.put('/atualizarPerfil', auth, upload.any(), perfilController.salvarPerfil);
router.get('/alterarSenha', auth, perfilController.alterarSenha);
router.put('/alterarSenha', auth, perfilController.salvarSenha);
router.get('/excluirPerfil', auth, perfilController.excluirConta);
router.delete('/excluirPerfil', auth, perfilController.salvaExcluirConta);
router.get('/problema/:id/resolvido', auth, perfilController.viewProblemaResolvido);
router.put('/problema/:id/resolvido', auth, perfilController.problemaResolvido);
router.get('/problema/:id/apagar', auth, perfilController.viewApagarProblema);
router.delete('/problema/:id/apagar', auth, perfilController.apagarProblema);


module.exports = router;