import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

class CartDao {
    async create() {
        return await Cart.create({ products: [] });
    }

    async getById(cartId) {
        return await Cart.findById(cartId).populate('products.product');
    }

    async addProduct(cartId, productId, quantity) {
        const product = await Product.findById(productId);
        if (!product) throw new Error('Producto no encontrado');

        let cart = await Cart.findById(cartId);
        if (!cart) {
            cart = new Cart({ products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await cart.save();
    }

    async removeProduct(cartId, productId) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        return await cart.save();
    }

    async emptyCart(cartId) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = [];
        return await cart.save();
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
        } else {
            throw new Error('Producto no encontrado en el carrito');
        }

        return await cart.save();
    }
}

export default CartDao;

