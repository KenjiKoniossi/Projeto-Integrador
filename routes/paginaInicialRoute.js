const express = require('express');
const router = express.Router();
const paginaInicialController = require('../controllers/paginaInicialController');
const auth = require("../middlewares/auth");
const path = require("path");
const multer = require("multer");


router.get('/', paginaInicialController.viewForm);
router.post('/', paginaInicialController.enviarProblema)

module.exports = router;