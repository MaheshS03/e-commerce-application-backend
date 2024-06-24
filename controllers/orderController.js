const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel'); 

const placeOrder = async (request, response) => {
    const { customerId, productId, quantity } = request.body;

    try {
        const customer = await userModel.findById(customerId);
        if (!customer) {
            return response.status(404).json({ message: 'Customer not found' });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return response.status(404).json({ message: 'Product not found' });
        }

        if (product.quantity < quantity) {
            return response.status(400).json({ message: 'Insufficient product quantity' });
        }

        const existingOrder = await orderModel.findOne({
            customerId: customer._id,
            'products.product': product._id
        });
        if (existingOrder) {
            return response.status(400).json({ message: 'You have already ordered this product' });
        }

        const totalAmount = product.price * quantity;

        const newOrder = new orderModel({
            orderId: Math.floor(Math.random() * 1000000), 
            customerId: customer._id,
            products: [{
                product: product._id,
                quantity: quantity,
                price: product.price
            }],
            totalAmount: totalAmount
        });

        await newOrder.save();

        product.quantity -= quantity;
        await product.save();

        response.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

module.exports = placeOrder
