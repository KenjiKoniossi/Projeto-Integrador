'use strict';
module.exports = (sequelize, DataTypes) => {
  const Newsletter = sequelize.define('Newsletter', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ativo: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    }
  },{
    tableName: 'newsletter',
    freezeTableName: true
  });
  Newsletter.associate = function(models) {
    // associations can be defined here
  };
  return Newsletter;
};