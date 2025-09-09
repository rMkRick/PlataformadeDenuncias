const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Denuncia = sequelize.define('Denuncia', {
  IdDenuncia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IdCiudadano: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IdTipoDenuncia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Direccion: {
    type: DataTypes.STRING(255)
  },
  Latitud: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true
  },
  Longitud: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true
  },
  Estado: {
    type: DataTypes.STRING(50),
    defaultValue: 'Pendiente'
  },
  FechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  IdFuncionarioAsignado: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'Denuncia',
  timestamps: false
});

module.exports = Denuncia;
