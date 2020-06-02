require('dotenv/config');

const mapaController = {
    // index,
    // show,
    // create,
    // store,
    // edit,
    // update,
    // destroy,
    viewForm: (req, res) => {
        res.render('mapa', { rua: 'Davi Banderali'} )
    },
    
}

module.exports = mapaController