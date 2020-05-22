'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag_problema = sequelize.define('Tag_problema', {
    id: DataTypes.INTEGER,
    tag: DataTypes.STRING
  }, {});
  Tag_problema.associate = function(models) {
    Tag_problema.hasMany(models.Problema, {
      as: 'problema'
    })
  };
  return Tag_problema;
};