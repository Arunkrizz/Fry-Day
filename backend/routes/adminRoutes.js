//? ===================================================== User Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from 'express';
import authenticateAdmin from '../middlewares/adminAuthMiddleware.js';



// ===================== Configuring Express Router =====================
const router = express.Router();

import {
    authAdmin,
    registerAdmin,
    logoutAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllUsers,
    deleteUserData,
    updateUserData,
    addUser,
    getAllHotels,
    updateHotelStatus,
    block_UnblockUser,
    showReportedPosts,
    removeReportedPost,
    updateUnlistStatus,

} from '../controllers/adminController.js';

import {
    adminGetHotelDashboard,
    adminGetDeptDashboardBoxs,
    adminGetRestaurantOrderCount
    
}from '../controllers/dashboardController.js'

import {
    getAllCategories,
    addCategoryData,
    updateCategoryData,
    unListCategoryData,
    reListCategoryData
} from '../controllers/categoryController.js'




//? =============================== Routes ===============================


//* ==================== Authentication Routes ====================

router.post('/', registerAdmin);

router.post('/auth', authAdmin);

router.post('/logout', logoutAdmin);

router.route('/profile').get( authenticateAdmin, getAdminProfile ).put( authenticateAdmin, updateAdminProfile );
// In the above line, the route is same, above line will use the specified controller according to the type of the request

router.post('/get-users', authenticateAdmin, getAllUsers);

router.post('/delete-user', authenticateAdmin, deleteUserData);

router.put('/update-user', updateUserData);

router.post('/add-user',authenticateAdmin,addUser)

router.post('/get-hotels', authenticateAdmin, getAllHotels);

router.put('/updateRegisterStatus',authenticateAdmin, updateHotelStatus);

router.post('/getCategories', authenticateAdmin, getAllCategories);

router.post('/addCategory', authenticateAdmin, addCategoryData);

router.put('/updateCategory', authenticateAdmin, updateCategoryData);

router.put('/unListCategory', authenticateAdmin, unListCategoryData);

router.put('/reListCategory', authenticateAdmin, reListCategoryData);

router.put('/block_UnblockUser',authenticateAdmin,block_UnblockUser)

router.get('/reportedPosts', authenticateAdmin, showReportedPosts);

router.put('/removeReportedPost', authenticateAdmin, removeReportedPost);

router.put('/updateUnlistStatus', authenticateAdmin,updateUnlistStatus);

router.get('/adminGetHotelDashboard', authenticateAdmin, adminGetHotelDashboard);

router.get('/adminGetDeptDashboardBoxs',authenticateAdmin, adminGetDeptDashboardBoxs);

router.get('/adminGetRestaurantOrderCount',authenticateAdmin, adminGetRestaurantOrderCount);




export default router;