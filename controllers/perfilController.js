const perfilController = {
    perfil: (req, res) => {
        res.render('perfil')
    },
    atualizarPerfil: (req, res) => {
        res.render('atualizarPerfil')
    },
    alterarSenha: (req, res) => {
        res.render('alterarSenha')
    },
    excluirConta: (req, res) => {
        res.render('excluirPerfil')
    }
    
}

module.exports = perfilController