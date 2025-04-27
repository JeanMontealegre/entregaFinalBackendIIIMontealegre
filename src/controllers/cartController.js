import CartDao from '../dao/CartDao.js';

const cartDao = new CartDao();

/**
 * Crea un nuevo carrito.
 */
export const createCart = async (req, res) => {
    try {
        const newCart = await cartDao.create();
        res.status(201).json({ message: 'Carrito creado con éxito', cart: newCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito', details: error.message });
    }
};

/**
 * Obtiene un carrito por su ID.
 */
export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito', details: error.message });
    }
};

/**
 * Agrega un producto al carrito.
 */
export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartDao.addProduct(cid, pid, quantity);
        res.status(200).json({ message: 'Producto agregado al carrito con éxito', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar producto al carrito', details: error.message });
    }
};

/**
 * Elimina un producto del carrito.
 */
export const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartDao.removeProduct(cid, pid);
        res.status(200).json({ message: 'Producto eliminado del carrito', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito', details: error.message });
    }
};

/**
 * Vacía completamente un carrito.
 */
export const emptyCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const emptiedCart = await cartDao.emptyCart(cid);
        res.status(200).json({ message: 'Carrito vaciado con éxito', cart: emptiedCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al vaciar el carrito', details: error.message });
    }
};

/**
 * Actualiza la cantidad de un producto en el carrito.
 */
export const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartDao.updateProductQuantity(cid, pid, quantity);
        res.status(200).json({ message: 'Cantidad del producto actualizada', cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar cantidad del producto', details: error.message });
    }
};
