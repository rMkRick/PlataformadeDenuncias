const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoEvidencia = sequelize.define('TipoEvidencia', {
  IdTipoEvidencia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NombreTipo: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'TipoEvidencia',
  timestamps: false
});

module.exports = TipoEvidencia;
