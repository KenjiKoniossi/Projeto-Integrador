'use strict';
module.exports = (sequelize, DataTypes) => {
  const Local_comercial = sequelize.define('Local_comercial', {
    id: DataTypes.INTEGER,
    nome_fantasia: DataTypes.STRING,
    telefone: DataTypes.INTEGER,
    cnpj: DataTypes.INTEGER,
    imagem: DataTypes.STRING,
    data_criacao: DataTypes.DATE,
    nota_acessivel: DataTypes.INTEGER,
    banheiro_acessivel: DataTypes.BOOLEAN,
    rampa_acessivel: DataTypes.BOOLEAN,
    descricao: DataTypes.TEXT,
    usuario_id: DataTypes.INTEGER,
    endereco_id: DataTypes.INTEGER
  }, {});
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