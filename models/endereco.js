'use strict';
module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    geolocalizacao: DataTypes.GEOMETRY('POINT'),
    cep: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    bairro: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    ponto_referencia: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {
    tableName: 'endereco'
  });
  Endereco.associate = function(models) {
    Endereco.hasMany(models.Perfil, {
      as: 'perfil'
    })
    Endereco.hasMany(models.Problema, {
      as: 'problema'
    })
    Endereco.hasMany(models.Local_comercial, {
      as: 'local_comercial'
    })
  };
  return Endereco;
};