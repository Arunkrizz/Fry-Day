import express from 'express';
import authenticateHotel from '../middlewares/hotelAuthMiddleware.js';
import { multerUploadProductImages,multerUploadPostImages } from '../config/multerConfig.js';
import { createProduct} from '../controllers/productController.js'
import {createPost} from '../controllers/postController.js'
import fileUpload from 'express-fileupload';

const router = express.Router();

import {
    register,
    register2,
    logout,
    login
} from '../controllers/restaurantController.js'; 

import {
    accessChats,
    fetchChatss,
    sendMessages,
    allMessages
} from '../controllers/chatController.js'

import {
    getAllCategories
} from '../controllers/categoryController.js'



router.post('/register',fileUpload(),register);

router.put('/registerCredentials',register2)

router.post('/logout',logout)

router.post('/login',login)

router.get('/getCategories', getAllCategories);

router.post('/addProduct', authenticateHotel, multerUploadProductImages, createProduct);

router.post('/addPost', authenticateHotel, multerUploadPostImages, createPost);

router.post('/accessChat', authenticateHotel, accessChats)
router.get('/fetchChats', authenticateHotel, fetchChatss)
router.post('/sendMessage', authenticateHotel, sendMessages)
router.get('/allMessages/:chatId', authenticateHotel, allMessages)

router.post('/addPost', (req,res)=>{
    console.log("add post");
});



router.get('/cities',(req,res)=>{
    console.log("cities")
    res.status(200).json({turn:"true"})
})

export default router;