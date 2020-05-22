'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
    comercial: DataTypes.BOOLEAN
  }, {});
  Usuario.associate = function(models) {
    Usuario.hasMany(models.Local_comercial, {
      as: 'local_comercial'
    })
    Usuario.hasMany(models.Problema, {
      as: 'problema'
    })
    Usuario.belongsTo(models.Perfil, {
      as: 'perfil'
    })
  };
  return Usuario;
};