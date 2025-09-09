const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Ciudadano, Funcionario } = require('../models'); // Importamos los modelos

// Secreto para JWT (¡debería estar en .env en producción!)
const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto'; // Usar variable de entorno

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  const { nombre, apellidos, dni, correo, telefono, usuario, contrasenia, rol, idCargo } = req.body;

  try {
    // Validar que el rol sea válido
    if (!['ciudadano', 'autoridad'].includes(rol)) {
      return res.status(400).json({ message: 'Rol no válido.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasenia, 10); // 10 es el saltRounds

    let newUser;
    if (rol === 'ciudadano') {
      // Crear ciudadano
      newUser = await Ciudadano.create({
        Nombres: nombre,
        Apellidos: apellidos,
        DNI: dni,
        Correo: correo,
        Telefono: telefono,
        Usuario: usuario,
        Contrasenia: hashedPassword,
        FechaRegistro: new Date()
      });
    } else { // rol === 'autoridad'
      // Validar que se proporcione IdCargo para funcionarios
      if (!idCargo) {
        return res.status(400).json({ message: 'IdCargo es requerido para funcionarios.' });
      }
      // Crear funcionario
      newUser = await Funcionario.create({
        Nombres: nombre,
        Apellidos: apellidos,
        Correo: correo,
        Telefono: telefono,
        Usuario: usuario,
        Contrasenia: hashedPassword,
        IdCargo: idCargo,
        FechaRegistro: new Date()
      });
    }

    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: newUser.id || newUser.IdCiudadano || newUser.IdFuncionario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'El DNI o el nombre de usuario ya existen.' });
    }
    res.status(500).json({ message: 'Error interno del servidor al registrar usuario.' });
  }
};

// Función para iniciar sesión
exports.login = async (req, res) => {
  const { usuario, contrasenia } = req.body;

  try {
    let user;
    // Intentar encontrar en Ciudadano
    user = await Ciudadano.findOne({ where: { Usuario: usuario } });

    if (!user) {
      // Si no es ciudadano, intentar encontrar en Funcionario
      user = await Funcionario.findOne({ where: { Usuario: usuario } });
    }

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(contrasenia, user.Contrasenia);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }

    // Determinar el rol para el token
    const rol = user.IdCiudadano ? 'ciudadano' : 'autoridad';
    const userId = user.IdCiudadano || user.IdFuncionario;

    // Generar JWT
    const token = jwt.sign({ userId: userId, rol: rol }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token,
      rol: rol,
      nombres: user.Nombres,
      apellidos: user.Apellidos
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor al iniciar sesión.' });
  }
};
