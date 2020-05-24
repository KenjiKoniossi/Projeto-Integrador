'use strict';
module.exports = (sequelize, DataTypes) => {
  const Perfil = sequelize.define('Perfil', {
    id: DataTypes.INTEGER,
    sobrenome: DataTypes.STRING,
    telefone: DataTypes.INTEGER,
    sobre_usuario: DataTypes.TEXT('LONG'),
    usuario_id: DataTypes.INTEGER,
    deficiencia_id: DataTypes.INTEGER,
    endereco_id: DataTypes.INTEGER,
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