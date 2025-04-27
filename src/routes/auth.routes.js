import express from 'express';
import passport from 'passport';
import { createToken } from '../utils/jwt.utils.js';

const router = express.Router();

// Registro con Passport
router.post('/register', async (req, res, next) => {
  passport.authenticate('register', { session: false }, async (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Error en el registro', error: err.message });
    if (!user) return res.status(400).json({ message: info.message });
    res.status(201).json({ message: 'Usuario registrado con éxito', user });
  })(req, res, next);
});

// Login con Passport
router.post('/login', async (req, res, next) => {
  passport.authenticate('login', { session: false }, async (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Error en el login', error: err.message });
    if (!user) return res.status(401).json({ message: info.message });
    const token = createToken({ id: user._id, role: user.role });
    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Inicio de sesión exitoso', token });
  })(req, res, next);
});

// Ruta protegida
router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.json({ user: req.user });
});

export default router;
