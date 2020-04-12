// const fs = require('fs')
// const path = require('path')

// const db = path.join('problemas.json')

// function listarProblema(){
//     let listaProblema = fs.readFileSync(db, {encoding:'utf-8'})
//     listaProblema = JSON.parse(listaProblema) 
//     return listaProblema
// }

// function aberturaProblema(problema, descricao, CEP, endereco, numero, bairro, cidade, estado, referencia, foto){
//     let listaUsuario = fs.readFileSync(db, {encoding:'utf-8'})
//     listaUsuario = JSON.parse(listaCardapio)  
//     listaUsuario.push({problema, descricao, CEP, endereco, numero, bairro, cidade, estado, referencia, foto})
//     return fs.writeFileSync(db, JSON.stringify(listaProblema))
//  }

// module.exports = {listarProblema, aberturaProblema}