const fs = require('fs')
const path = require('path')

const db = path.join('problema.json')


function envioProblema(problema, descricao, CEP, endereco, numero, bairro, cidade, estado, referencia, foto){
   let listaProblema = fs.readFileSync(db, {encoding:'utf-8'})
   listaProblema = JSON.parse(listaProblema)  
   listaProblema.push({problema, descricao, CEP, endereco, numero, bairro, cidade, estado, referencia, foto})
   return fs.writeFileSync(db, JSON.stringify(listaProblema))
}



module.exports = {envioProblema}