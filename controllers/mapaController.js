const {Problema, Endereco, Tag_problema} = require('../models');
const { Op } = require("sequelize");
const {check, validationResult, body} = require('express-validator');

const mapaController = {
    viewForm: (req, res) => {
        res.render('mapa')
    },

    pesquisaEndereco: async (req, res) => {

        //Validação dos dados
        let listaErrosContato = validationResult(req).errors;
        if (listaErrosContato.length != 0) {
            return res.status(400).json();
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
            return res.status(400).json();
        }

    },
    
}

module.exports = mapaController