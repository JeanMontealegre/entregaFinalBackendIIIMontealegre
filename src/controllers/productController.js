import productDao from '../dao/ProductDao.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await productDao.getAll();
        res.status(200).json({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productDao.getById(req.params.id);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.status(200).json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = await productDao.create(req.body);
        res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productDao.update(req.params.id, req.body);
        if (!updatedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.status(200).json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productDao.delete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.status(200).json({ status: 'success', payload: deletedProduct });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

