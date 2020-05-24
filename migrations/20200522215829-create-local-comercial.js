'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Local_comercials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_fantasia: {
        allowNull: false,
        type: Sequelize.STRING
      },
      telefone: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cnpj: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imagem: {
        type: Sequelize.STRING
      },
      data_criacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      nota_acessivel: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      banheiro_acessivel: {
        type: Sequelize.BOOLEAN
      },
      rampa_acessivel: {
        type: Sequelize.BOOLEAN
      },
      descricao: {
        type: Sequelize.TEXT
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Enderecos',
          key: 'id'
        }
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
    return queryInterface.dropTable('Local_comercials');
  }
};