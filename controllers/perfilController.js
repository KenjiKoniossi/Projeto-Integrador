const bcrypt = require('bcrypt');
const {Perfil, Problema, Endereco, Usuario} = require('../models');

const perfilController = {
    perfil: async (req, res) => {

        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        //Se tiver um perfil, recupera a descrição do perfil, se não, adiciona um frase padrão
        let sobre_usuario = 'Adicione aqui uma informações sobre você. Clique em "Atualizar perfil" para editar suas informações.';
        if (perfilUsuario !== null) {
            sobre_usuario = perfilUsuario.sobre_usuario;
        }

        //Sugestão de implementação, adicionar os dados do perfil do usuário na view e não somente o texto sobre

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
        
        res.render('perfil', {dadosUsuario, sobre_usuario, listaProblemas});
    },

    atualizarPerfil: async (req, res) => {

        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });
        
        //Verifica se ele tem um endereço
        let enderecoUsuario = null;
        if (perfilUsuario !== null) {
            enderecoUsuario = await Endereco.findOne({
                where: {
                    id: perfilUsuario.endereco_id
                }
            });
        };

        res.render('atualizarPerfil', {perfilUsuario, dadosUsuario, enderecoUsuario});
    },

    salvarPerfil: async (req, res) => {

        //Dados Temporários
        const point = {
            type: 'Point',
            coordinates: [39.807222,-76.984722]
        };
        const pais = 'BR';

        const {nomePerfil, sobrenome, emailPerfil, telefone, rua, numero, bairro, referencia, cep, cidade, estado, sobreUsuario} = req.body;

        //Verifica se o email enviado é diferente do original, caso positivo, retornar erro

        //Atualiza o nome do usuário, retorna uma array, não a model
        let dadosUsuario = await Usuario.update({
            nome: nomePerfil
        },{
            where: {
                id: req.session.usuario.id
            }
        })

        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        let enderecoUsuario = {
            id: null
        };
        //Usuario não tem perfil
        if (perfilUsuario === null) {
            //Cria o endereço caso CEP e número não sejam nulos
            if (cep != '' && numero != '') {
                enderecoUsuario = await Endereco.create({
                    geolocalizacao: point,
                    cep,
                    bairro,
                    rua,
                    numero,
                    cidade,
                    estado,
                    ponto_referencia: referencia,
                    pais
                })
            }
            //Cria perfil
            perfilUsuario = await Perfil.create({
                sobrenome,
                telefone,
                sobre_usuario: sobreUsuario,
                usuario_id: req.session.usuario.id,
                endereco_id: enderecoUsuario.id
            })
        } else {

            //Altera os dados já existentes no perfil
            perfilUsuario = await Perfil.update({
                sobrenome,
                telefone,
                sobre_usuario: sobreUsuario
            },{
                where: {
                    usuario_id: req.session.usuario.id
                }
            });

            perfilUsuario = await Perfil.findOne({
                where: {
                    usuario_id: req.session.usuario.id
                }
            });

            //Caso: usuário tenha perfil e endereço
            if (perfilUsuario.endereco_id !== null) {

                //Atualiza os dados do endereço
                enderecoUsuario = await Endereco.update({
                    geolocalizacao: point,
                    cep,
                    bairro,
                    rua,
                    numero,
                    cidade,
                    estado,
                    ponto_referencia: referencia,
                    pais
                },{
                    where: {
                        id: perfilUsuario.endereco_id
                    }
                });

            } else {
                
                //Caso: usuário tem perfil, mas não tem endereço
                if (cep != '' && numero != '') {
                    enderecoUsuario = await Endereco.create({
                        geolocalizacao: point,
                        cep,
                        bairro,
                        rua,
                        numero,
                        cidade,
                        estado,
                        ponto_referencia: referencia,
                        pais
                    });

                    //Atualiza o endereco_id no perfil
                    perfilUsuario = await Perfil.update({
                        endereco_id: enderecoUsuario.id
                    },{
                        where: {
                            usuario_id: req.session.usuario.id
                        }
                    });
                }
            }
        }
        
        res.redirect('/perfil')
    },

    alterarSenha: async (req, res) => {

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        res.render('alterarSenha', {dadosUsuario})
    },
    
    salvarSenha: async (req, res) => {

        const {senhaAtual, novaSenha, confNovaSenha} = req.body;

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        //Compara senha atual com senha guardada, se falso retorna erro
        if (!bcrypt.compareSync(senhaAtual, dadosUsuario.senha)) {
            let erroSenha = '<strong>Senha atual inválida</strong>';
            return res.render('alterarSenha', {dadosUsuario, erroSenha});
        }

        //Gera hash da nova senha e faz update
        const hashSenha = bcrypt.hashSync(novaSenha, 10);

        //Confirma se senhas digitadas são iguais
        if (!bcrypt.compareSync(confNovaSenha, hashSenha)) {
            let erroSenha = '<strong>Nova senha e confirmação de senha devem ser iguais</strong>';
            return res.render('alterarSenha', {dadosUsuario, erroSenha});
        }

        let updateDadosUsuario = await Usuario.update({
            senha: hashSenha
        },{
            where: {
                id: req.session.usuario.id
            }
        });

        res.redirect('/perfil');
    },

    excluirConta: (req, res) => {
        res.render('excluirPerfil')
    }
    
}

module.exports = perfilController