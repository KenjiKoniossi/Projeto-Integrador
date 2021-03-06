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

        //Sugestão de implementação, adicionar os dados do perfil do usuário na view e não somente o texto sobre

        //Verifica se o usuário já enviou problemas
        let listaProblemas = await Problema.findAll({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        res.render('perfil', {dadosUsuario, perfilUsuario, listaProblemas});
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

        //Salvar avatar do usuário
        let foto = 'avatar-padrao-mobmap.jpg';
        if (req.files.length > 0) {
            foto = req.files[0].filename;
        } else {
            if (perfilUsuario.avatar !== null || perfilUsuario.avatar !== 'avatar-padrao-mobmap.jpg') {
                foto = perfilUsuario.avatar;
            }
        }

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
                avatar: foto,
                usuario_id: req.session.usuario.id,
                endereco_id: enderecoUsuario.id
            })
        } else {

            //Altera os dados já existentes no perfil
            perfilUsuario = await Perfil.update({
                sobrenome,
                telefone,
                sobre_usuario: sobreUsuario,
                avatar: foto
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

        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        res.render('alterarSenha', {dadosUsuario, perfilUsuario})
    },
    
    salvarSenha: async (req, res) => {

        const {senhaAtual, novaSenha, confNovaSenha} = req.body;

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        //Compara senha atual com senha guardada, se falso retorna erro
        if (!bcrypt.compareSync(senhaAtual, dadosUsuario.senha)) {
            let erroSenha = '<div class="alert alert-danger" role="alert"><strong>Senha atual</strong> digitada inválida.</div>';
            return res.render('alterarSenha', {dadosUsuario, perfilUsuario, erroSenha});
        }

        //Gera hash da nova senha e faz update
        const hashSenha = bcrypt.hashSync(novaSenha, 10);

        //Confirma se senhas digitadas são iguais
        if (!bcrypt.compareSync(confNovaSenha, hashSenha)) {
            let erroSenha = '<div class="alert alert-danger" role="alert"><strong>Nova senha</strong> e <strong>confirmação de senha</strong> devem ser iguais.</div>';
            return res.render('alterarSenha', {dadosUsuario, perfilUsuario, erroSenha});
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

    excluirConta: async (req, res) => {

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        res.render('excluirPerfil', {dadosUsuario, perfilUsuario});
    },

    salvaExcluirConta: async (req, res) => {

        //Recupera dados do perfil do usuário
        let dadosPefil = await Perfil.findOne({
            where: {
                id: req.session.usuario.id
            }
        });
        
        if(dadosPefil !== null) {

            //Recupera endereço
            let dadosEndereco = await Endereco.findOne({
                where: {
                    id: dadosPefil.endereco_id
                }
            });

            if (dadosEndereco !== null) {

                //Deleta perfil
                await dadosPefil.destroy();

                //Delete endereço
                await dadosEndereco.destroy();

            } else {

                //Deleta perfil
                await dadosPefil.destroy();
            }


        }
        
        //Deleta usuário
        let excluirConta = await Usuario.destroy({
            where: {
                id: req.session.usuario.id
            }
        });

        req.session.destroy();
        res.locals.session = undefined;

        res.redirect('/');
    },

    viewProblemaResolvido: async (req, res) => {

        let {id} = req.params;

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        //Recuperar model do problema
        let dadosProblema = await Problema.findOne({
            where: {
                id
            }
        });

        //Valida os dados, verifica se o usuario_id do problema tem o mesmo ID do usuário
        if (dadosUsuario.id != dadosProblema.usuario_id) {
            return res.redirect('/perfil');
        }

        res.render('problemaResolvido', {dadosUsuario, perfilUsuario, id});

    },

    problemaResolvido: async (req, res) => {

        let {id} = req.params;

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        //Recuperar model do problema
        let dadosProblema = await Problema.findOne({
            where: {
                id
            }
        });

        //Validação dos dados, verifica se usuário da sessão é o mesmo do problema
        if (dadosUsuario.id != dadosProblema.usuario_id) {
            let erroProblemaResolvido = 'Houve um <strong>erro</strong> ao tentar alterar o status do relato de problema como resolvido, tente novamente.'
            return res.render('problemaResolvido', {dadosUsuario, id, erroProblemaResolvido})
        }

        //Update do status do problema para resolvido
        let updateProblema = await Problema.update({
            resolvido: true
        }, {
            where: {
                id
            }
        })
        
        res.redirect('/perfil')

    },

    viewApagarProblema: async (req, res) => {

        let {id} = req.params;

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        //Verifica se o usuário já tem um perfil
        let perfilUsuario = await Perfil.findOne({
            where: {
                usuario_id: req.session.usuario.id
            }
        });

        //Recuperar model do problema
        let dadosProblema = await Problema.findOne({
            where: {
                id
            }
        });

        //Valida os dados, verifica se o usuario_id do problema tem o mesmo ID do usuário
        if (dadosUsuario.id != dadosProblema.usuario_id) {
            return res.redirect('/perfil');
        }

        res.render('apagarProblema', {dadosUsuario, perfilUsuario, id});
},

    apagarProblema: async (req, res) => {

        let {id} = req.params;

        //Recupera dados do usuário
        let dadosUsuario = await Usuario.findOne({
            where: {
                id: req.session.usuario.id
            }
        });

        //Recuperar model do problema
        let dadosProblema = await Problema.findOne({
            where: {
                id
            }
        });

        //Validação dos dados, verifica se usuário da sessão é o mesmo do problema
        if (dadosUsuario.id != dadosProblema.usuario_id) {
            let erroApagarProblema = 'Houve um <strong>erro</strong> ao tentar apagar o relato de problema, tente novamente.'
            return res.render('apagarProblema', {dadosUsuario, id, erroApagarProblema})
        }

        //Recuperar endereço do problema
        let dadosEndereco = await Endereco.findOne({
            where: {
                id: dadosProblema.endereco_id
            }
        })

        //Apagar o relato de problema enviado
        await dadosProblema.destroy();

        //Apagar endereço depois do problema pois está atrelado ao problema pela FK
        await dadosEndereco.destroy();

        res.redirect('/perfil');
    },
    
}

module.exports = perfilController