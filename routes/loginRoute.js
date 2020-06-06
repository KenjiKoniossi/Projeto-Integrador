const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')

router.post('/', loginController.create)
router.get('/logout', loginController.destroy)

module.exports = router