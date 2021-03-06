'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag_problema = sequelize.define('Tag_problema', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    tag: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    tableName: 'tag_problema',
    freezeTableName: true
  });
  Tag_problema.associate = function(models) {
    Tag_problema.hasMany(models.Problema, {
      foreignKey: 'tag_problema_id',
      as: 'problema'
    })
  };
  return Tag_problema;
};