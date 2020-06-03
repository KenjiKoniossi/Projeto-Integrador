'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contato = sequelize.define('Contato', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    mensagem: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'contato'
  });
  Contato.associate = function(models) {
    // associations can be defined here
  };
  return Contato;
};