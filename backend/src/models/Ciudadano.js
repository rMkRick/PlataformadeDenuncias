const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ciudadano = sequelize.define('Ciudadano', {
  IdCiudadano: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombres: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Apellidos: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  DNI: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    unique: true
  },
  Correo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  Telefono: {
    type: DataTypes.STRING(15)
  },
  Usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  Contrasenia: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  FechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Ciudadano',
  timestamps: false // Tu tabla ya tiene FechaRegistro
});

module.exports = Ciudadano;
