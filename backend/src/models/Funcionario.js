const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Funcionario = sequelize.define('Funcionario', {
  IdFuncionario: {
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
  IdCargo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  FechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Funcionario',
  timestamps: false
});

module.exports = Funcionario;
