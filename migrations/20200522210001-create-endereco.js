'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('endereco', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      geolocalizacao: {
        type: Sequelize.GEOMETRY('POINT'),
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bairro: {
        type: Sequelize.STRING,
      },
      rua: {
        type: Sequelize.STRING,
      },
      numero: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING,
      },
      estado: {
        type: Sequelize.STRING,
      },
      ponto_referencia: {
        type: Sequelize.STRING
      },
      pais: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('endereco');
  }
};
