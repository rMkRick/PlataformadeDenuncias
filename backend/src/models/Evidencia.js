const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Evidencia = sequelize.define('Evidencia', {
  IdEvidencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IdDenuncia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdTipoEvidencia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  UrlArchivo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  FechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Evidencia',
  timestamps: false
});

module.exports = Evidencia;
