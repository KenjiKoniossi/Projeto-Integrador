# Projeto Integrador - MobMap

<img src="/public/images/wesley_logo_novo_azul.png" width="30%">

## Descrição

MobMap é um sistema Web com o intuito de mapear pontos na cidade que dificultam a mobilidade urbana de pessoas com mobilidade reduzida, como buracos na via que dificultam a passagem para um idoso ou um poste no meio da calçada que impede um cadeirante de passar, atráves do relato de problemas pelo usuário. 

## Tecnologias utilizadas

- NodeJS
- ExpressJS
- Sequelize
- HTML/CSS
- JavaScript

## Sobre o projeto

Projeto Integrador para conclusão do curso de Desenvolvimento Full Stack Node na Digital House, campus Vila Olímpia, curso oferecido pelo Santander Universidades com bolsa atráves do projeto Santander Coders by Digital House.

## Instruções para uso

Instalar as dependências
```
npm install
```

Criar arquivo .env e colocar senha do banco de dados (substituir SENHA pela senha do banco de dados)
```
echo DB_PASS=SENHA > .env
```

Criar o banco de dados com o Sequelize
```
npx sequelize db:create
```

Executar as migrations com o Sequelize
```
npx sequelize db:migrate
```

Executar as seeders com o Sequelize
```
npx sequelize db:seed:all
```

Para inicializar o servidor, use o comando
```
npx start
```
ou
```
npm start
```

## Grupo

- Grupo: 3
- Turma: 5 (Santander Coders)

## Integrantes

- Deyvison J. de Paula - [@deyvisonjp](https://github.com/deyvisonjp)
- Eric Kenji - [@KenjiKoniossi](https://github.com/KenjiKoniossi)
- Marcos P. Moura - [@MarcosPMoura](https://github.com/MarcosPMoura)
- Matheus Sousa - [@matheussilvaesousa](https://github.com/matheussilvaesousa)
- Wesley Soares - [@wesleybs90](https://github.com/wesleybs90)

## Santander Coders - DigitalHouse

<img src="/public/images/logo_dh_grande.PNG" width="30%">