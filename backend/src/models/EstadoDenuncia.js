const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstadoDenuncia = sequelize.define('EstadoDenuncia', {
  IdEstado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NombreEstado: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'EstadoDenuncia',
  timestamps: false
});

module.exports = EstadoDenuncia;
