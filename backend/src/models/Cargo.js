const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importamos la conexión a la BD

const Cargo = sequelize.define('Cargo', {
  IdCargo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NombreCargo: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'Cargo', // Asegura que el nombre de la tabla en la BD sea 'Cargo'
  timestamps: false // Esta tabla no necesita createdAt/updatedAt
});

module.exports = Cargo;
