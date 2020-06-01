'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deficiencia = sequelize.define('Deficiencia', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tag_deficiencia: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'deficiencia'
  });
  Deficiencia.associate = function(models) {
    Deficiencia.hasMany(models.Perfil, {
      as: 'deficiencia'
    });
  }
  return Deficiencia;
};