//? ===================================================== User Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from 'express';
import authenticateUser from '../middlewares/userAuthMiddleware.js';



// ===================== Configuring Express Router =====================
const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    gAuthRegister,
    gAuthUser,
    getUserViewPosts,
    getHotelProducts,
    getHotelLocation,
    getHotelDetails,
    checkBlock,
    verifyMail,
    forgotPassword,
    resetPassword,
    verifyOtp,
    resendOtp,
    fetchRestaurantDatas,
    likePost,
    unlikePost,
    commentPost,
    commentDelete,
    reportPost,
    changeAddress,
    
} from '../controllers/userController.js';

import {
    accessChat,
    fetchChats,
    sendMessage,
    allMessages,
    readMessagesUpdate,
    markAsReadUpdate

} from '../controllers/chatController.js'


import {
    fetchNotifications,
    deleteNotification
} from '../controllers/notificationController.js'

import {
     addToCart,
     getCart,
     changeQuantity,
     removeCartProduct
 } from '../controllers/cartController.js';

 import {
    checkOut,
    fetchAllOrders,
    cancelOrder
 } from '../controllers/orderController.js'

import { multerUploadUserProfile } from '../config/multerConfig.js';
import fileUpload from 'express-fileupload';




//? =============================== Routes ===============================


//* ==================== Authentication Routes ====================

router.post('/register', registerUser);

router.post('/gAuthRegister',gAuthRegister)

router.post('/auth', authUser);
 
router.post('/gAuthLogin', gAuthUser);

router.post('/logout', logoutUser);

router.post ('/getUserViewPosts',getUserViewPosts)

router.put ('/getHotelProducts',authenticateUser,getHotelProducts)

router.put( '/getHotelLocation',authenticateUser,getHotelLocation)

router.put('/getHotelDetails',authenticateUser,getHotelDetails)

router.route('/profile').get( authenticateUser, getUserProfile ).put( authenticateUser, multerUploadUserProfile.single('profileImage'), updateUserProfile );

router.post('/changeAddress',authenticateUser,fileUpload(),changeAddress)

router.post('/accessChat', authenticateUser, accessChat)

router.get('/fetchChats', authenticateUser, fetchChats)

router.post('/sendMessage', authenticateUser, sendMessage)

router.get('/allMessages/:chatId', authenticateUser, allMessages)

router.get('/allNotifications', authenticateUser, fetchNotifications)

router.put('/deleteNotification/:notificationId', authenticateUser, deleteNotification)

router.put('/readMessagesUpdate/:chatId', authenticateUser, readMessagesUpdate)

router.post('/markAsReadUpdate', authenticateUser, markAsReadUpdate)

router.post('/addToCart',authenticateUser,addToCart)

router.get ('/getCart',authenticateUser,getCart)

router.post('/changeProductQuantity',authenticateUser,changeQuantity)

router.post ('/removeCartProduct',authenticateUser,removeCartProduct)

router.post ('/checkout',authenticateUser,fileUpload(),checkOut)

router.post ('/verifyMail',verifyMail)

router.post('/forgotPassword', forgotPassword)

router.post('/otpVerify', authenticateUser, verifyOtp)

router.post('/resendOtp', authenticateUser, resendOtp)

router.post('/resetPassword', authenticateUser, resetPassword)

router.post('/fetchRestaurantDatas',authenticateUser,fetchRestaurantDatas)

router.post('/likePost/:postId', authenticateUser, likePost)

router.delete('/unlikePost/:postId', authenticateUser, unlikePost)

router.post('/commentPost/:postId', authenticateUser, commentPost)

router.delete('/commentDelete/:postId', authenticateUser, commentDelete)

router.post('/reportPost', authenticateUser, reportPost);

router.get('/fetchAllOrders',authenticateUser,fetchAllOrders)

router.put('/cancelOrder/:id',authenticateUser,cancelOrder)

router.put('/checkBlock',authenticateUser, checkBlock)


export default router;