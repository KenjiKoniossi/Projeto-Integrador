'use strict';
module.exports = (sequelize, DataTypes) => {
  const Perfil = sequelize.define('Perfil', {
    sobrenome: DataTypes.STRING,
    telefone: DataTypes.INTEGER,
    sobre_usuario: DataTypes.TEXT
  }, {});
  Perfil.associate = function(models) {
    Perfil.belongsTo(models.Deficiencia, {
      foreignKey: 'deficiencia_id',
      as: 'deficiencia'
    })
    Perfil.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario'
    })
    Perfil.belongsTo(models.Endereco, {
      foreignKey: 'endereco_id',
      as: 'endereco'
    })
  };
  return Perfil;
};