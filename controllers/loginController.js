const Sequelize = require("sequelize")
const config = require("../config/database")
const bcrypt = require("bcrypt")

loginController = {
  create: async (req, res) => {
    const { email, senha } = req.body
    const con = new Sequelize(config.development)
    
    const [ usuario ] = await con.query('SELECT * FROM usuario WHERE email=:email LIMIT 1', {
      replacements: { email },
      type: Sequelize.QueryTypes.SELECT
    })

    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      return res.send('Login ou senha incorretos')
    }

    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }

    return res.redirect('/')
  },
  destroy: (req, res) => {
    req.session = undefined
    return res.redirect('/')
  }
}

module.exports = loginController

