
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

const cadastroController = {

    view: (req, res) => {
        res.render('/')
    },

    store: async (req, res) => {
        const { nome, email, senha } = req.body
        const hashPassword = bcrypt.hashSync(senha, 10);

        const getEmail = await Usuario.findOne({ where: { email } });

        if (getEmail) {
            return res.render('paginaInicial', { msg: 'E-mail já cadastrado, faça o login' });
        }

        const usuario = await Usuario.create({
            nome,
            email,
            senha: hashPassword,
            admin: false,
            comercial: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        if (!usuario) {
            return res.render('paginaInicial', { msg: "Não foi possível cadastrar!" });
        }

        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
        };
        
        return res.redirect('/perfil');
    },

    login: (req, res) => {
        res.render('login')
    },
    recuperarSenha: (req, res) => {
        res.render('recuperarSenha')
    },
}

module.exports = cadastroController