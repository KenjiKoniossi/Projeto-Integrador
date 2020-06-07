const { Contato } = require('../models')

const paginaInicialController = {
    viewForm: (req, res) => {
        console.log(req.session)
        res.render('paginaInicial', { session: req.session })
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