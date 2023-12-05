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
    allMessages
} from '../controllers/chatController.js'

import { multerUploadUserProfile } from '../config/multerConfig.js';




//? =============================== Routes ===============================


//* ==================== Authentication Routes ====================

router.post('/register', registerUser);

router.post('/gAuthRegister',gAuthRegister)

router.post('/auth', authUser);

router.post('/gAuthLogin', gAuthUser);

router.post('/logout', logoutUser);

router.post ('/getUserViewPosts',getUserViewPosts)

router.put ('/getHotelProducts',getHotelProducts)

router.put( '/getHotelLocation',getHotelLocation)

router.put('/getHotelDetails',getHotelDetails)

router.route('/profile').get( authenticateUser, getUserProfile ).put( authenticateUser, multerUploadUserProfile.single('profileImage'), updateUserProfile );

router.post('/accessChat', authenticateUser, accessChat)
router.get('/fetchChats', authenticateUser, fetchChats)
router.post('/sendMessage', authenticateUser, sendMessage)
router.get('/allMessages/:chatId', authenticateUser, allMessages)

router.put('/checkBlock', checkBlock)







export default router;