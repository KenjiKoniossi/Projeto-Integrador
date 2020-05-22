'use strict';
module.exports = (sequelize, DataTypes) => {
  const Problema = sequelize.define('Problema', {
    id: DataTypes.INTEGER,
    descricao: DataTypes.STRING,
    imagem: DataTypes.STRING,
    data_criacao: DataTypes.DATE,
    resolvido: DataTypes.BOOLEAN,
    tag_problema_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
    endereco_id: DataTypes.INTEGER
  }, {});
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