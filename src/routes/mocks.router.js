import express from 'express';
import { faker } from '@faker-js/faker'; 
import User from '../models/User.js';
import Pet from '../models/Pet.js';
import { hashPassword } from '../utils/password.utils.js';

const router = express.Router();

// Endpoint para generar 50 usuarios falsos
router.get('/mockingusers', async (req, res) => {
  try {
    const users = [];

    for (let i = 0; i < 50; i++) {
      const hashedPwd = await hashPassword('coder123');
      users.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        password: hashedPwd,
        role: 'user',
        pets: [],
      });
    }

    res.status(200).json({ status: 'success', payload: users });
  } catch (error) {
    console.error('Error generando usuarios:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Endpoint para generar 20 mascotas falsas
router.get('/mockingpets', async (req, res) => {
  try {
    const pets = [];

    for (let i = 0; i < 20; i++) {
      pets.push({
        name: faker.person.firstName(), // 🔹 faker.person
        species: faker.animal.type(),   // 🔹 faker.animal
        age: faker.number.int({ min: 1, max: 15 }),
      });
    }

    res.status(200).json({ status: 'success', payload: pets });
  } catch (error) {
    console.error('Error generando mascotas:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Endpoint para generar usuarios y mascotas en MongoDB
router.post('/generateData', async (req, res) => {
  try {
    const { userCount = 10, petCount = 10 } = req.body;

    const users = [];
    const pets = [];

    for (let i = 0; i < petCount; i++) {
      const newPet = await Pet.create({
        name: faker.person.firstName(),
        species: faker.animal.type(),
        age: faker.number.int({ min: 1, max: 15 }),
      });
      pets.push(newPet);
    }

    for (let i = 0; i < userCount; i++) {
      const hashedPwd = await hashPassword('coder123');
      const assignedPets = faker.helpers.arrayElements(pets, { min: 0, max: 3 });

      const user = await User.create({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        password: hashedPwd,
        role: 'user',
        pets: assignedPets.map(p => p.name),
      });

      users.push(user);
    }

    res.status(201).json({ status: 'success', users, pets });
  } catch (error) {
    console.error('Error generando datos:', error.message);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
