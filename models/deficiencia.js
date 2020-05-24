'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deficiencia = sequelize.define('Deficiencia', {
    id: DataTypes.INTEGER,
    deficiencia: DataTypes.STRING
  }, {});
  Deficiencia.associate = function(models) {
    Deficiencia.hasMany(models.Perfil, {
      as: 'deficiencia'
    });
  }
  return Deficiencia;
};