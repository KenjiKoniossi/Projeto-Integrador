
const problema = require('../models/problema');
const enviarProblemaController = {
    viewForm: (req, res) => {
        res.render('enviarProblema')
    },
    envioProblema:(req, res) =>{
        let [foto] = req.files
        problema.envioProblema(req.body.problema, req.body.descricao, req.body.CEP, req.body.endereco, req.body.numero, req.body.bairro, req.body.cidade, req.body.estado, req.body.referencia, foto.filename);
        res.redirect('/')
        console.log(req)
    },
    
}

module.exports = enviarProblemaController