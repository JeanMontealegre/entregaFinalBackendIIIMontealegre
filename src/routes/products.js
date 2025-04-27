import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un solo producto por su ID
router.get('/:id', getProductById);

// Crear un nuevo producto
router.post('/', createProduct);

// Actualizar un producto por su ID
router.put('/:id', updateProduct);

// Eliminar un producto por su ID
router.delete('/:id', deleteProduct);

export default router;
