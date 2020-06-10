const { Contato } = require('../models')
const {check, validationResult, body} = require('express-validator');

const paginaInicialController = {
    viewForm: (req, res) => {
        res.render('paginaInicial', { session: req.session })
    },

    enviarContato: async (req, res) => {

        //Validação dos dados
        let listaErrosContato = validationResult(req).errors;
        if (listaErrosContato.length != 0) {
            return res.render('paginaInicial', {listaErrosContato})
        }

        //Modificado os 'names' para não conflitar com o cadastro/login
        const { nomeContato, emailContato, mensagemContato } = req.body;

        const enviarContato = await Contato.create({
            nome: nomeContato,
            email: emailContato,
            mensagem: mensagemContato
        })

        let sucessoContato = 'Mensagem enviada com <strong>sucesso</strong>!';
        res.render('paginaInicial', {sucessoContato});
    }
}

module.exports = paginaInicialController