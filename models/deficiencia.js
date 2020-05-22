'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deficiencia = sequelize.define('Deficiencia', {
    deficiencia: DataTypes.STRING
  }, {});
  Deficiencia.associate = function(models) {
    Deficiencia.hasMany(models.Perfil, {
      as: 'deficiencia'
    });
  }
  return Deficiencia;
};