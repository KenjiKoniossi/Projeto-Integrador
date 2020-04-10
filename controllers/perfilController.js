const perfilController = {
    perfil: (req, res) => {
        res.render('perfil')
    },
    atualizarPerfil: (req, res) => {
        res.render('atualizarPerfil')
    },
    
}

module.exports = perfilController