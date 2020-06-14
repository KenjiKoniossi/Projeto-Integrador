const { Contato, Newsletter } = require('../models')
const {check, validationResult, body} = require('express-validator');

const paginaInicialController = {
    viewForm: (req, res) => {
        res.render('paginaInicial')
    },

    enviarNewsletter: async (req, res) => {
        const {email} = req.body;

        try {
            const emailCadastrado = await Newsletter.findOne({
                where: {
                    email
                }
            })
    
            if (emailCadastrado !== null) {
    
                emailCadastrado.ativo = true;
                await emailCadastrado.save();
    
            } else {
    
                const dadosNewsletter = await Newsletter.create({
                    email,
                    ativo: true
                })
    
            }
    
            return res.status(201);

        } catch {

            return res.status(400);

        }

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