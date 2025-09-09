const sequelize = require('../config/database');
const Cargo = require('./Cargo');
const Ciudadano = require('./Ciudadano');
const Funcionario = require('./Funcionario');
const TipoDenuncia = require('./TipoDenuncia');
const Denuncia = require('./Denuncia');
const TipoEvidencia = require('./TipoEvidencia');
const Evidencia = require('./Evidencia');
const EstadoDenuncia = require('./EstadoDenuncia');
const SeguimientoDenuncia = require('./SeguimientoDenuncia');

// Definir Asociaciones
// Funcionario - Cargo (Un Cargo tiene muchos Funcionarios, un Funcionario pertenece a un Cargo)
Cargo.hasMany(Funcionario, { foreignKey: 'IdCargo', as: 'Funcionarios' });
Funcionario.belongsTo(Cargo, { foreignKey: 'IdCargo', as: 'Cargo' });

// Denuncia - Ciudadano (Un Ciudadano tiene muchas Denuncias, una Denuncia pertenece a un Ciudadano)
Ciudadano.hasMany(Denuncia, { foreignKey: 'IdCiudadano', as: 'Denuncias' });
Denuncia.belongsTo(Ciudadano, { foreignKey: 'IdCiudadano', as: 'Ciudadano' });

// Denuncia - TipoDenuncia (Un TipoDenuncia tiene muchas Denuncias, una Denuncia pertenece a un TipoDenuncia)
TipoDenuncia.hasMany(Denuncia, { foreignKey: 'IdTipoDenuncia', as: 'Denuncias' });
Denuncia.belongsTo(TipoDenuncia, { foreignKey: 'IdTipoDenuncia', as: 'TipoDenuncia' });

// Denuncia - Funcionario (Un Funcionario puede ser asignado a muchas Denuncias, una Denuncia puede ser asignada a un Funcionario)
Funcionario.hasMany(Denuncia, { foreignKey: 'IdFuncionarioAsignado', as: 'DenunciasAsignadas' });
Denuncia.belongsTo(Funcionario, { foreignKey: 'IdFuncionarioAsignado', as: 'FuncionarioAsignado' });

// Evidencia - Denuncia (Una Denuncia tiene muchas Evidencias, una Evidencia pertenece a una Denuncia)
Denuncia.hasMany(Evidencia, { foreignKey: 'IdDenuncia', as: 'Evidencias' });
Evidencia.belongsTo(Denuncia, { foreignKey: 'IdDenuncia', as: 'Denuncia' });

// Evidencia - TipoEvidencia (Un TipoEvidencia tiene muchas Evidencias, una Evidencia pertenece a un TipoEvidencia)
TipoEvidencia.hasMany(Evidencia, { foreignKey: 'IdTipoEvidencia', as: 'Evidencias' });
Evidencia.belongsTo(TipoEvidencia, { foreignKey: 'IdTipoEvidencia', as: 'TipoEvidencia' });

// SeguimientoDenuncia - Denuncia (Una Denuncia tiene muchos Seguimientos, un Seguimiento pertenece a una Denuncia)
Denuncia.hasMany(SeguimientoDenuncia, { foreignKey: 'IdDenuncia', as: 'Seguimientos' });
SeguimientoDenuncia.belongsTo(Denuncia, { foreignKey: 'IdDenuncia', as: 'Denuncia' });

// SeguimientoDenuncia - EstadoDenuncia (Un EstadoDenuncia tiene muchos Seguimientos, un Seguimiento pertenece a un EstadoDenuncia)
EstadoDenuncia.hasMany(SeguimientoDenuncia, { foreignKey: 'IdEstado', as: 'Seguimientos' });
SeguimientoDenuncia.belongsTo(EstadoDenuncia, { foreignKey: 'IdEstado', as: 'EstadoDenuncia' });

// SeguimientoDenuncia - Funcionario (Un Funcionario puede realizar muchos Seguimientos, un Seguimiento puede ser realizado por un Funcionario)
Funcionario.hasMany(SeguimientoDenuncia, { foreignKey: 'IdFuncionario', as: 'SeguimientosRealizados' });
SeguimientoDenuncia.belongsTo(Funcionario, { foreignKey: 'IdFuncionario', as: 'Funcionario' });


const db = {
  sequelize,
  Cargo,
  Ciudadano,
  Funcionario,
  TipoDenuncia,
  Denuncia,
  TipoEvidencia,
  Evidencia,
  EstadoDenuncia,
  SeguimientoDenuncia
};

module.exports = db;
