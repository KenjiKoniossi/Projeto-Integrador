# Projeto Integrador - MobMap

<img src="/public/images/wesley_logo_novo_azul.png" width="30%">

## Acessível pelo link:
- [MobMap.me](http://mobmap.me/)

Ou
- [MobMap (Heroku)](https://mobmapproducao.herokuapp.com/)

## Descrição

MobMap é um sistema Web com o intuito de mapear pontos na cidade que dificultam a mobilidade urbana de pessoas com mobilidade reduzida, como buracos na via que dificultam a passagem para um idoso ou um poste no meio da calçada que impede um cadeirante de passar, atráves do relato de problemas pelo usuário. 

## Tecnologias utilizadas

- Back-end:
	- NodeJS
	- ExpressJS
	- Sequelize (Banco de Dados com MySQL)

- Front-end:
	- JavaScript
	- HTML/CSS
	- Bootstrap

## Sobre o projeto

Projeto Integrador para conclusão do curso de Desenvolvimento Full Stack Node na Digital House, campus Vila Olímpia, curso oferecido pelo Santander Universidades com bolsa atráves do projeto Santander Coders by Digital House.

## Instruções para uso

Após clonar o repositório, instalar as dependências:
```
npm install
```

Renomear o arquivo .env.example para .env e inserir a senha do banco de dados (substituir "SENHA" pela senha do banco de dados MySQL) e adicionar a chave do Google Geocoding API no lugar de "CHAVE" ou crie o arquivo com o comando, substituindo os valores indicados:
```
echo -e "DB_PASS=SENHA\nAPI_KEY=CHAVE" > .env
```

Criar o banco de dados com o Sequelize:
```
npx sequelize db:create
```

Executar as migrations com o Sequelize:
```
npx sequelize db:migrate
```

Executar as seeders com o Sequelize:
```
npx sequelize db:seed:all
```

Para inicializar o servidor na porta 3000 do localhost, use o comando:
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

## Santander Coders by DigitalHouse

<img src="/public/images/logo_dh_grande.PNG" width="30%">
