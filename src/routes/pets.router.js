import express from 'express';
import Pet from '../models/Pet.js';

const router = express.Router();

// GET: Obtener todas las mascotas
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json({ status: 'success', payload: pets });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
