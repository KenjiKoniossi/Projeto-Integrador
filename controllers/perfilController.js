const perfilController = {
    perfil: (req, res) => {
        res.render('perfil')
    },
    atualizarPerfil: (req, res) => {
        res.render('atualizarPerfil')
    },
    alterarSenha: (req, res) => {
        res.render('alterarSenha')
    }
    
}

module.exports = perfilController