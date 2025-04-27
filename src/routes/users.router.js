import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET: Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: 'success', payload: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
