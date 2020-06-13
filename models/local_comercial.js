'use strict';
module.exports = (sequelize, DataTypes) => {
  const Local_comercial = sequelize.define('Local_comercial', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome_fantasia: {
      allowNull: false,
      type: DataTypes.STRING
    },
    telefone: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    cnpj: {
      allowNull: false,
      type: DataTypes.STRING
    },
    imagem: DataTypes.STRING,
    data_criacao: DataTypes.DATE,
    nota_acessivel: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    banheiro_acessivel: DataTypes.BOOLEAN,
    rampa_acessivel: DataTypes.BOOLEAN,
    descricao: DataTypes.TEXT('LONG'),
    usuario_id: DataTypes.INTEGER,
    endereco_id: DataTypes.INTEGER
  }, {
    tableName: 'local_comercial',
    freezeTableName: true
  });
  Local_comercial.associate = function(models) {
    Local_comercial.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      as: 'usuario'
    })
    Local_comercial.belongsTo(models.Endereco, {
      foreignKey: 'endereco_id',
      as: 'endereco'
    })
  };
  return Local_comercial;
};