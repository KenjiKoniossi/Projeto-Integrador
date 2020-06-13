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
      type: DataTypes.STRING
    },
    bairro: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cidade: DataTypes.STRING,
    estado: DataTypes.STRING,
    ponto_referencia: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {
    tableName: 'endereco',
    freezeTableName: true
  });
  Endereco.associate = function(models) {
    Endereco.hasMany(models.Perfil, {
      foreignKey: 'endereco_id',
      as: 'perfil'
    })
    Endereco.hasMany(models.Problema, {
      foreignKey: 'endereco_id',
      as: 'problema'
    })
    Endereco.hasMany(models.Local_comercial, {
      foreignKey: 'endereco_id',
      as: 'local_comercial'
    })
  };
  return Endereco;
};