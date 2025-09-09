const express = require('express');
const router = express.Router();
const denunciaController = require('../controllers/denunciaController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Middleware para verificar rol de autoridad
const isAutoridad = (req, res, next) => {
  if (req.user.rol !== 'autoridad') {
    return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de autoridad.' });
  }
  next();
};

// Rutas para Denuncias

// POST /api/denuncias - Crear una nueva denuncia (solo ciudadanos)
router.post('/', authMiddleware, upload.fields([
  { name: 'fotos', maxCount: 10 }, // Increased maxCount for photos
  { name: 'videos', maxCount: 5 }, // Changed name to 'videos' and increased maxCount
  { name: 'documentos', maxCount: 5 } // Changed name to 'documentos' and increased maxCount
]), denunciaController.createDenuncia);

// GET /api/denuncias - Obtener todas las denuncias (solo autoridades)
router.get('/', authMiddleware, isAutoridad, denunciaController.getAllDenuncias);

// GET /api/denuncias/mis-denuncias - Obtener las denuncias del usuario logueado (ciudadano)
router.get('/mis-denuncias', authMiddleware, denunciaController.getDenunciasByCiudadano);

// PUT /api/denuncias/:id/estado - Actualizar el estado de una denuncia (solo autoridades)
router.put('/:id/estado', authMiddleware, isAutoridad, denunciaController.updateDenunciaStatus);

// GET /api/denuncias/tipos - Obtener todos los tipos de denuncia
router.get('/tipos', denunciaController.getTiposDenuncia);

module.exports = router;
