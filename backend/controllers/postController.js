import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import mongoose from 'mongoose'
const { ObjectId } = mongoose.Types;

const createPost = asyncHandler(async (req, res) => { 
    const { title, description, category } = req.body;
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
    // Create a new product
    const newPost = new Post({
        title,
        description,
        category: categoryId,
        images,
        stores:  req.hotel._id
    });
 
    // Save the product to the database
    const createdPost = await newPost.save();
console.log("createdPost",createdPost)

        // Send the response with updated user data
    if (createdPost) {
        res.status(200).json({success: true, message: 'Post added successfully' });
    } else {
        res.status(404);
        throw new Error("Post is not created");
    }

});


export {
    createPost
} 