const {Perfil, Problema, Endereco, Usuario} = require('../models');

const perfilController = {
    perfil: async (req, res) => {
        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        //Se tiver um perfil, recupera a descrição do perfil, se não, adiciona um frase padrão
        let sobre_usuario = 'Adicione aqui uma informações sobre você. Clique em "Atualizar perfil" para editar suas informações.';
        if (perfilUsuario !== null) {
            sobre_usuario = perfilUsuario.sobre_usuario;
        }

        //Verifica se o usuário já enviou problemas
        let listaProblemas = await Problema.findAll({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        // //Trata o objeto Sequelize instances, convertendo para JSON
        // listaProblemas = JSON.stringify(listaProblemas);
        // //Trata o JSON para array
        // listaProblemas = JSON.parse(listaProblemas);
        
        res.render('perfil', {sobre_usuario, listaProblemas});
    },

    atualizarPerfil: async (req, res) => {
        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        //Cria perfil caso não tenha
        if (perfilUsuario === null) {
            perfilUsuario = await Perfil.create({
                usuario_id: req.session.usuario.id
            })
        }

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        //Verifica se ele tem um endereço
        let enderecoUsuario = await Endereco.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        res.render('atualizarPerfil', {perfilUsuario});
    },

    salvarPerfil: async (req, res) => {

    },

    alterarSenha: (req, res) => {
        res.render('alterarSenha')
    },
    excluirConta: (req, res) => {
        res.render('excluirPerfil')
    }
    
}

module.exports = perfilController