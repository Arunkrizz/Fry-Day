import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    images: [String],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    stores: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
    dateListed: {
        type: Date,
        default: Date.now,
    },
    
});

const Product = mongoose.model('Product', productSchema);

export default Product;
