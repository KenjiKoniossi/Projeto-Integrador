const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public','images'))
    },
    filename: function (req, file, cb) {
        cb(null, path.extname(file.originalname))
    }
  });
const upload = multer({ storage: storage })


const enviarProblemaController = require('../controllers/enviarProblemaController')


router.get('/', enviarProblemaController.viewForm);
router.post('/', upload.any(), enviarProblemaController.envioProblema)



module.exports = router;