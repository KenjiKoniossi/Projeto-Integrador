'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
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
      unique: true,
      type: DataTypes.STRING,
    },
    senha: {
      allowNull: false,
      type: DataTypes.STRING
    },
    admin: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    comercial: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
  }, {
    tableName: 'usuario',
    freezeTableName: true
  });
  Usuario.associate = function(models) {
    Usuario.hasMany(models.Local_comercial, {
      foreignKey: 'usuario_id',
      as: 'local_comercial'
    })
    Usuario.hasMany(models.Problema, {
      foreignKey: 'usuario_id',
      as: 'problema'
    })
    Usuario.hasOne(models.Perfil, {
      foreignKey: 'usuario_id',
      as: 'perfil'
    })
  };
  return Usuario;
};