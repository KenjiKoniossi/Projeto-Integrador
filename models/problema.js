'use strict';
module.exports = (sequelize, DataTypes) => {
  const Problema = sequelize.define('Problema', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    descricao: {
      allowNull: false,
      type: DataTypes.STRING
    },
    imagem: {
      allowNull: false,
      type: DataTypes.STRING
    },
    data_criacao: {
      allowNull: false,
      type: DataTypes.DATE
    },
    resolvido: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    tag_problema_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    endereco_id: DataTypes.INTEGER
  }, {
    tableName: 'problema',
    freezeTableName: true
  });
  Problema.associate = function(models) {
    Problema.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario'
    })
    Problema.belongsTo(models.Endereco, {
      foreignKey: 'endereco_id',
      as: 'endereco'
    })
    Problema.belongsTo(models.Tag_problema, {
      foreignKey: 'tag_problema_id',
      as: 'tag'
    })
  };
  return Problema;
};