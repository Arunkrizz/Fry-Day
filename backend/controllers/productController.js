import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types;

const createProduct = asyncHandler(async (req, res) => {
    console.log("here in create1")
 
// console.log('Request Body:', req.body);
    const { title, description, category,price } = req.body;
    const images = req.files.map((file) => file.filename);
    let categoryId;
    try {
        // Attempt to convert the category to ObjectId
        categoryId = new ObjectId(category);
        } catch (error) {
        // Handle the error if the conversion fails
        console.error('Invalid category ObjectId:', error);
        return res.status(400).json({ success: false, message: 'Invalid category ObjectId' });
            }
    console.log("id", categoryId)
    // Create a new product
    const newProduct = new Product({
        title,
        description,
        price,
        category: categoryId,
        images,
        stores:  req.hotel._id
    });
 
    // Save the product to the database
    const createdProduct = await newProduct.save();
console.log("createdProduct",createdProduct)

        // Send the response with updated user data
    if (createProduct) {
        res.status(200).json({success: true, message: 'Product added successfully' });
    } else {
        res.status(404);
        throw new Error("Product is not created");
    }

});


export {
    createProduct
} 