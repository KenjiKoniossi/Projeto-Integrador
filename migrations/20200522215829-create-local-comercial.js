'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('local_comercial', {
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
        type: Sequelize.STRING
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
        type: Sequelize.TEXT('LONG')
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'id'
        }
      },
      endereco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'endereco',
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
    return queryInterface.dropTable('local_comercial');
  }
};