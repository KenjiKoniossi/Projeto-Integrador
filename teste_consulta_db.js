const {Usuario} = require('./models');

Usuario.findAll().then(valor => console.log(valor));