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
    checkBlock
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

import { multerUploadUserProfile } from '../config/multerConfig.js';




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


router.put('/checkBlock',authenticateUser, checkBlock)







export default router;