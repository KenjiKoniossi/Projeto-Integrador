const cadastroController = {
    cadastro: (req, res) => {
        res.render('cadastro')
    },
    novaConta: (req, res) => {
        res.render('novaConta')
    },
    login: (req, res) => {
        res.render('login')
    },
    recuperarSenha: (req, res) => {
        res.render('recuperarSenha')
    },
}

module.exports = cadastroController