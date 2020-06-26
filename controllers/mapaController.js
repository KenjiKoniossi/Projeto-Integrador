const {Problema, Endereco, Tag_problema} = require('../models');
const { Sequelize, Op } = require("sequelize");
const {check, validationResult, body} = require('express-validator');

const mapaController = {
    viewForm: (req, res) => {
        res.render('mapa')
    },

    pesquisaEndereco: async (req, res) => {

        //Validação dos dados
        let listaErrosContato = validationResult(req).errors;
        if (listaErrosContato.length != 0) {
            return res.status(400).json({
                mensagem: 'Algo deu errado',
            });
        }

        const {pesquisa} = req.body;

        try {

            //Busca problemas no endereço
            const buscaRua = await Problema.findAll({
                include: [{
                    model: Endereco,
                    as: 'endereco',
                    required: true,
                    where: {
                        rua: {
                            [Op.substring]: pesquisa
                        },
                    }
                }, {
                    model: Tag_problema,
                    as: 'tag',
                    required: true
                }]
            })
            
            return res.status(200).json({
                buscaRua
            });

        } catch {
            return res.status(400).json({
                mensagem: 'Algo deu errado',
            });
        }

    },

    carregaProblemas: async (req, res) => {

        //Validação dos dados
        let listaErrosContato = validationResult(req).errors;
        if (listaErrosContato.length != 0) {
            return res.status(400).json({
                mensagem: 'Algo deu errado',
            });
        }

        const {latitude, longitude, mapaBounds} = req.body;

        try {

            //Haversine formula
            // const distancia = Sequelize.literal("6371 * acos(cos(radians("+latitude+")) * cos(radians(ST_X(geolocalizacao))) * cos(radians("+longitude+") - radians(ST_Y(geolocalizacao))) + sin(radians("+latitude+")) * sin(radians(ST_X(geolocalizacao))))");
            
            // const resultado = Sequelize.literal("abs(abs(abs("+latitude+")-abs(ST_X(geolocalizacao)))+abs(abs("+longitude+")-abs(ST_Y(geolocalizacao))))");

            const resultado = Sequelize.literal("abs(abs(abs("+latitude+")-abs(latitude))+abs(abs("+longitude+")-abs(longitude)))");

            const listaDeProblemas = await Endereco.findAll({
                attributes: [
                    'id',
                    'latitude',
                    'longitude',
                    [resultado, 'resultado']
                ],
                include: [{
                    model: Problema,
                    as : 'problema',
                    attributes: [
                        'id',
                        'descricao',
                        'imagem',
                        'data_criacao',
                        'resolvido',
                    ],
                    include: [{
                        model: Tag_problema,
                        as: 'tag',
                        attributes: [
                            'tag'
                        ]
                    }]
            
                }],
                where: {
                    [Op.and]: [
                        Sequelize.literal("latitude BETWEEN "+ mapaBounds._southWest.lat +" AND "+ mapaBounds._northEast.lat),
                        Sequelize.literal("longitude BETWEEN "+ mapaBounds._southWest.lng +" AND "+ mapaBounds._northEast.lng)
                    ]
                },
                order: Sequelize.col('resultado')
            })
console.log(listaDeProblemas)

            return res.status(200).json({
                listaDeProblemas
            });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                mensagem: 'Algo deu errado',
            });
        }
    },
    
}

module.exports = mapaController