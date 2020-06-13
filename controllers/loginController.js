// const Sequelize = require("sequelize");
const config = require("../config/database");
const bcrypt = require("bcrypt");
const { Usuario } = require('../models');

loginController = {
  create: async (req, res) => {
    const { email, senha } = req.body

    const dadosUsuario = await Usuario.findOne({
      where: {
        email
      }
    });

    if (!dadosUsuario || !bcrypt.compareSync(senha, dadosUsuario.senha)) {
      return res.render('paginaInicial', { msg: "Login ou senha incorretos" });
    }
    
    req.session.usuario = {
      id: dadosUsuario.id,
      nome: dadosUsuario.nome,
      email: dadosUsuario.email
    }

    return res.redirect('/perfil')
  },
  destroy: (req, res) => {
    
    req.session.destroy()
    return res.redirect('/')

  }
}

module.exports = loginController

