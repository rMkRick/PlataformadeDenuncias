const { Denuncia, Ciudadano, TipoDenuncia, Funcionario, Evidencia, sequelize } = require('../models');

// Crear una nueva denuncia
exports.createDenuncia = async (req, res) => {
  const { IdTipoDenuncia, descripcion, latitud, longitud } = req.body;
  const IdCiudadano = req.user.userId;

  const t = await sequelize.transaction();

  try {
    const nuevaDenuncia = await Denuncia.create({
      IdCiudadano,
      IdTipoDenuncia,
      Descripcion: descripcion,
      Latitud: latitud,
      Longitud: longitud,
      FechaRegistro: new Date(),
    }, { transaction: t });

    const IdDenuncia = nuevaDenuncia.IdDenuncia;
    const evidencias = [];

    if (req.files) {
      if (req.files.fotos) {
        req.files.fotos.forEach(file => {
          evidencias.push({
            IdDenuncia,
            IdTipoEvidencia: 1, // Imagen
            UrlArchivo: file.path,
          });
        });
      }
      if (req.files.video) {
        req.files.video.forEach(file => {
          evidencias.push({
            IdDenuncia,
            IdTipoEvidencia: 2, // Video
            UrlArchivo: file.path,
          });
        });
      }
      if (req.files.documento) {
        req.files.documento.forEach(file => {
          evidencias.push({
            IdDenuncia,
            IdTipoEvidencia: 4, // Documento
            UrlArchivo: file.path,
          });
        });
      }
    }

    if (evidencias.length > 0) {
      await Evidencia.bulkCreate(evidencias, { transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: 'Denuncia creada exitosamente', denuncia: nuevaDenuncia });
  } catch (error) {
    await t.rollback();
    console.error('Error al crear denuncia:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todas las denuncias (para autoridades)
exports.getAllDenuncias = async (req, res) => {
  try {
    const denuncias = await Denuncia.findAll({
      include: [
        { model: Ciudadano, as: 'Ciudadano', attributes: ['Nombres', 'Apellidos'] },
        { model: TipoDenuncia, as: 'TipoDenuncia', attributes: ['NombreTipo'] },
        // Aquí se podría incluir el estado actual a través de la tabla de seguimiento
      ],
      order: [['FechaRegistro', 'DESC']]
    });
    res.status(200).json(denuncias);
  } catch (error) {
    console.error('Error al obtener denuncias:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener las denuncias de un ciudadano específico
exports.getDenunciasByCiudadano = async (req, res) => {
  const IdCiudadano = req.user.userId;

  try {
    const denuncias = await Denuncia.findAll({
      where: { IdCiudadano },
      attributes: ['IdDenuncia', 'Descripcion', 'FechaRegistro', 'Estado'], // Asegurarse de incluir 'Estado'
      include: [
        {
          model: TipoDenuncia,
          as: 'TipoDenuncia',
          attributes: ['NombreTipo']
        }
      ],
      order: [['FechaRegistro', 'DESC']]
    });
    res.status(200).json(denuncias);
  } catch (error) {
    console.error('Error al obtener mis denuncias:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar el estado de una denuncia (para autoridades)
exports.updateDenunciaStatus = async (req, res) => {
  const { id } = req.params;
  const { IdEstado, IdFuncionarioAsignado } = req.body;
  const IdFuncionario = req.user.userId;

  try {
    // Lógica para actualizar el estado en la tabla de seguimiento (SeguimientoDenuncia)
    // Esto es una simplificación. En un caso real, se crearía un nuevo registro en SeguimientoDenuncia.
    const denuncia = await Denuncia.findByPk(id);
    if (!denuncia) {
      return res.status(404).json({ message: 'Denuncia no encontrada' });
    }

    // Asignar funcionario si se provee
    if (IdFuncionarioAsignado) {
        denuncia.IdFuncionarioAsignado = IdFuncionarioAsignado;
    }
    
    // Aquí iría la lógica para añadir una entrada a la tabla de seguimiento
    // Por ahora, solo actualizamos la denuncia para simplificar
    // await denuncia.save();

    res.status(200).json({ message: `Estado de la denuncia actualizado (simulación)` });

  } catch (error) {
    console.error('Error al actualizar denuncia:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los tipos de denuncia
exports.getTiposDenuncia = async (req, res) => {
  try {
    const tipos = await TipoDenuncia.findAll();
    res.status(200).json(tipos);
  } catch (error) {
    console.error('Error al obtener los tipos de denuncia:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};