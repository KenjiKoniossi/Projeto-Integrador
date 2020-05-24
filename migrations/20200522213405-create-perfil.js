'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Perfils', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sobrenome: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.INTEGER
      },
      sobre_usuario: {
        type: Sequelize.TEXT('LONG')
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id'
        }
      },
      deficiencia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Deficiencia',
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
    return queryInterface.dropTable('Perfils');
  }
};