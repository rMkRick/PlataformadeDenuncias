const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SeguimientoDenuncia = sequelize.define('SeguimientoDenuncia', {
  IdSeguimiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  IdDenuncia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  IdEstado: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Observacion: {
    type: DataTypes.STRING(255)
  },
  IdFuncionario: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'SeguimientoDenuncia',
  timestamps: false
});

module.exports = SeguimientoDenuncia;
