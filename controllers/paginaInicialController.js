const { Contato } = require('../models')

const paginaInicialController = {
    viewForm: (req, res) => {
        res.render('paginaInicial')
    },
    enviarProblema: async (req, res) => {
        const { nome, email, mensagem } = req.body
        const problema = await Contato.create({
            nome,
            email,
            mensagem
        })

        res.redirect('/')
    }
}

module.exports = paginaInicialController