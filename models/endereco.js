'use strict';
module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    id: DataTypes.INTEGER,
    geolocalizacao: DataTypes.STRING,
    cep: DataTypes.INTEGER,
    bairro: DataTypes.STRING,
    endereco: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    ponto_referencia: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {});
  Endereco.associate = function(models) {
    Endereco.hasMany(models.Perfil, {
      as: 'perfil'
    })
    Endereco.hasMany(models.Problema, {
      as: 'problema'
    })
    Endereco.belongsTo(models.Local_comercial, {
      as: 'local_comercial'
    })
  };
  return Endereco;
};