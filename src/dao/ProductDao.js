import Product from '../models/Product.js';

class ProductDao {
    async getAll() {
        return await Product.find();
    }

    async getById(productId) {
        return await Product.findById(productId);
    }

    async create(productData) {
        const newProduct = new Product(productData);
        return await newProduct.save();
    }

    async update(productId, productData) {
        return await Product.findByIdAndUpdate(productId, productData, { new: true });
    }

    async delete(productId) {
        return await Product.findByIdAndDelete(productId);
    }
}

export default new ProductDao();
