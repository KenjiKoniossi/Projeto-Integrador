const problema_old = require('../model_problema_old');
const {Problema, Endereco, Tag_problema} = require('../models');
const {check, validationResult, body} = require('express-validator');

const enviarProblemaController = {
    viewForm: (req, res) => {
        res.render('enviarProblema')
    },

    //Envio do problema salvando em JSON, desatualizado
    envioProblema:(req, res) =>{
        let [foto] = req.files
        problema_old.envioProblema(req.body.problema, req.body.descricao, req.body.cep, req.body.endereco, req.body.numero, req.body.bairro, req.body.cidade, req.body.estado, req.body.referencia, foto.filename);
        res.redirect('/')
    },

    envioProb: async (req, res) =>{

        //Validação dos dados
        let listaDeErros = validationResult(req).errors;
        if (listaDeErros.length != 0) {
            return res.render('enviarProblema', {listaDeErros});
        }

        const usuarioId = req.session.usuario.id;
        const pais = 'BR';

        let foto = 'imagem-padrao-mobmap.jpg';
        if (req.files.length > 0) {
            foto = req.files[0].filename;
        }

        const {problema, problema_outro, descricao, cep, rua, numero, bairro, cidade, estado, referencia, longitude, latitude} = req.body;

        //Dados da latitude e longitude
        const point = {
            type: 'Point',
            coordinates: [latitude,longitude]
        };

        //Seleção do ID da tag ou criação da tag
        let tagId = null;
        switch (problema) {
            case 'Calçada esburacada':
                tagId = 1;
                break;
            
            case 'Inclinação íngrime':
                tagId = 2;
                break;
            
            case 'Piso escorregadio':
                tagId = 3;
                break;
            
            case 'Árvore obstruindo caminho':
                tagId = 4;
                break;
            
            case 'Poste obstruindo caminho':
                tagId = 5;
                break;
            
            case 'Ocupação irregular':
                tagId = 6;
                break;
            
            case 'Outro':
                let tagCreate = await Tag_problema.create({
                    tag: problema_outro,
                })
                tagId = tagCreate.id;
                break;
        }

        //Criação do endereço relacionado ao problema
        const enderecoCreate = await Endereco.create({
            geolocalizacao: point,
            cep,
            bairro,
            rua,
            numero,
            cidade,
            estado,
            ponto_referencia: referencia,
            pais,
        })

        //Criação do problema
        const problemaCreate = await Problema.create({
            descricao,
            imagem: foto,
            data_criacao: new Date(),
            resolvido: false,
            tag_problema_id: tagId,
            usuario_id: usuarioId,
            endereco_id: enderecoCreate.id,
        })

        let sucessoEnviado = true;
        res.redirect('/enviarproblema?sucesso=problema-enviado')
    },
    
}

module.exports = enviarProblemaController