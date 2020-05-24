'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Problemas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imagem: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_criacao: {
        allowNull: false,
        type: Sequelize.DATE
      },
      resolvido: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      tag_problema_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tag_problemas',
          key: 'id'
        }
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
    return queryInterface.dropTable('Problemas');
  }
};