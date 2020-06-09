const problema_old = require('../model_problema_old');
const {Problema, Endereco, Tag_problema} = require('../models');

const enviarProblemaController = {
    viewForm: (req, res) => {
        res.render('enviarProblema')
    },

    //Envio do problema salvando em JSON, desatualizado
    envioProblema:(req, res) =>{
        let [foto] = req.files
        problema_old.envioProblema(req.body.problema, req.body.descricao, req.body.cep, req.body.endereco, req.body.numero, req.body.bairro, req.body.cidade, req.body.estado, req.body.referencia, foto.filename);
        res.redirect('/')
        console.log(req)
    },

    envioProb: async (req, res) =>{
        //Dados Temporários
        const usuarioId = req.session.usuario.id;
        const point = {
            type: 'Point',
            coordinates: [39.807222,-76.984722]
        };
        const pais = 'BR';

        let foto = 'imagem-padrao-mobmap.png';
        if (req.files.length > 0) {
            foto = req.files[0].filename;
        }

        const {problema, problema_outro, descricao, cep, rua, numero, bairro, cidade, estado, referencia} = req.body;

        //Validação dos dados
        if (typeof(problema.trim()) !== 'string' || problema.trim() === '') {
            //Envia para view
            res.redirect('/enviarproblema?erro=problema')
        }

        if (problema === 'Outro' && (typeof(problema_outro.trim()) !== 'string' || problema_outro.trim() === '')) {
            res.redirect('/enviarproblema?erro=problema-outro')
        }

        if (typeof(descricao.trim()) !== 'string') {
            res.redirect('/enviarproblema?erro=descricao')
        }

        if (typeof(cep.trim()) !== 'string' || cep.trim() === '') {
            res.redirect('/enviarproblema?erro=cep')
        }

        if (typeof(rua.trim()) !== 'string' || rua.trim() === '') {
            res.redirect('/enviarproblema?erro=rua')
        }

        if (typeof(numero.trim()) !== 'string' || numero.trim() === '') {
            res.redirect('/enviarproblema?erro=numero')
        }

        if (typeof(bairro.trim()) !== 'string' || bairro.trim() === '') {
            res.redirect('/enviarproblema?erro=bairro')
        }

        if (typeof(cidade.trim()) !== 'string' || cidade.trim() === '') {
            res.redirect('/enviarproblema?erro=cidade')
        }

        if (typeof(estado.trim()) !== 'string' || estado.trim() === '') {
            res.redirect('/enviarproblema?erro=estado')
        }

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

        const problemaCreate = await Problema.create({
            descricao,
            imagem: foto,
            data_criacao: new Date(),
            resolvido: false,
            tag_problema_id: tagId,
            usuario_id: usuarioId,
            endereco_id: enderecoCreate.id,
        })

        res.redirect('/enviarproblema?sucesso=problema-enviado')
    },
    
}

module.exports = enviarProblemaController