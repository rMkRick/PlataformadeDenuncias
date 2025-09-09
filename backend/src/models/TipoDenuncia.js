const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoDenuncia = sequelize.define('TipoDenuncia', {
  IdTipoDenuncia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NombreTipo: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'TipoDenuncia',
  timestamps: false
});

module.exports = TipoDenuncia;
