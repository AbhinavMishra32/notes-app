const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'], // if no name, error message
    },
    quantity: {
        type: Number,
        required: [true, 'Please enter quantity'],
        default: 0
    },
    price: { 
        type: Number, 
        required: [true, 'Please enter price']
    },
    image: {
        type: String, 
        required: false
    },
},
    {
        timestamps: true,
    }
    );

const Product = mongoose.model('Product', productSchema);

module.exports = Product;