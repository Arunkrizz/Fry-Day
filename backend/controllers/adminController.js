//? ===================================================== Admin Controller =====================================================

// ===================== Importing necessary modules/files =====================
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import AdminModel from '../models/adminModel.js';
import generateAdminToken from '../utils/jwtConfig/adminJwtConfig/generateAdminToken.js';
import destroyAdminToken from '../utils/jwtConfig/adminJwtConfig/destroyAdminToken.js';

import { updateRegisterStatus, fetchAllUsers, deleteUser, updateUser, fetchAllHotels, updateHotelUnlistStatus } from '../utils/Helpers/adminHelpers.js';
import Post from '../models/postModel.js';
import Report from '../models/reportModel.js';



const authAdmin = asyncHandler(async (req, res) => {

    /*
     # Desc: Auth user/set token
     # Route: POST /api/admin/auth
     # Access: PUBLIC
    */

    const { email, password } = req.body;

    if (!email || !password) {

        // If email or password is empty, return error

        res.status(401);

        throw new Error('Email or Password is missing in the request, Admin authentication failed.');

    }

    // Find the user in Db with the email and password
    const admin = await AdminModel.findOne({ email: email });

    let passwordValid = false;

    if (admin) {

        passwordValid = await admin.matchPassword(password);

    }

    if (passwordValid) {

        // If user is created, send response back with jwt token

        generateAdminToken(res, admin._id); // Middleware to Generate token and send it back in response object

        const registeredAdminData = {
            name: admin.name,
            email: admin.email
        }

        res.status(201).json(registeredAdminData);

    }

    if (!admin || !passwordValid) {

        // If user or user password is not valid, send error back

        res.status(401);

        throw new Error('Invalid Email or Password, Admin authentication failed.');

    }

});

const registerAdmin = asyncHandler(async (req, res) => {

    /*
     # Desc: Register new user
     # Route: POST /api/admin/auth
     # Access: PUBLIC
    */

    const { name, email, password, adminRegistrationKey } = req.body;

    if (!email || !password) {

        // If email or password is empty, return error

        res.status(401);

        throw new Error('Email or Password is missing in the request, Admin registration failed.');

    }

    if (!adminRegistrationKey) {

        // If adminRegistrationKey is empty, return error

        res.status(401);

        throw new Error('No Admin Registration Access Code, Admin registration aborted.');

    } else {

        // Check if Admin registration key is valid
        if (process.env.ADMIN_REGISTRATION_KEY !== adminRegistrationKey) {

            res.status(401);

            throw new Error('Invalid Admin Registration Access Code, Admin registration failed.');

        }

    }

    // Check if user already exist
    const userExists = await AdminModel.findOne({ email });

    // If the user already exists, throw an error
    if (userExists) {

        res.status(400);

        throw new Error('Admin already exists.');

    }

    // Store the user data to DB if the user dosen't exist already.
    const user = await AdminModel.create({
        name: name,
        email: email,
        password: password
    });


    if (user) {

        // If user is created, send response back with jwt token

        generateAdminToken(res, user._id); // Middleware to Generate token and send it back in response object

        const registeredUserData = {
            name: user.name,
            email: user.email
        }

        res.status(201).json(registeredUserData);

    } else {

        // If user was NOT Created, send error back

        res.status(400);

        throw new Error('Invalid user data, User registration failed.');

    }


});

const logoutAdmin = asyncHandler(async (req, res) => {

    /*
     # Desc: Logout user / clear cookie
     # Route: POST /api/admin/logout
     # Access: PUBLIC
    */

    destroyAdminToken(res);

    res.status(200).json({ message: 'Admin Logged Out' });

});

const getAdminProfile = asyncHandler(async (req, res) => {

    /*
     # Desc: Get user profile
     # Route: GET /api/admin/profile
     # Access: PRIVATE
    */

    const user = {

        name: req.user.name,
        email: req.user.email

    }

    res.status(200).json({ user });

});

const updateAdminProfile = asyncHandler(async (req, res) => {

    /*
     # Desc: Update admin profile
     # Route: PUT /api/admin/profile
     # Access: PRIVATE
    */

    // Find the user data with user id in the request object
    const admin = await AdminModel.findById(req.user._id);

    if (admin) {

        // Update the user with new data if found or keep the old data itself.
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;

        // If request has new password, update the user with the new password
        if (req.body.password) {

            admin.password = req.body.password

        }

        const updatedAdminData = await admin.save();

        // Send the response with updated user data
        res.status(200).json({

            name: updatedAdminData.name,
            email: updatedAdminData.email

        });

    } else {

        res.status(404);

        throw new Error("Requested Admin not found.");

    };

});

/*
   # Desc: Fetch all the users 
   # Route: PUT /api/admin/get-users
   # Access: PRIVATE
  */

const getAllUsers = asyncHandler(async (req, res) => {

    console.log(req.body, "get user")

    const usersData = await fetchAllUsers(req.body)

    if (usersData) {

        res.status(200).json({ usersData });

    } else {

        res.status(404);

        throw new Error("Users data fetch failed.");

    }

});

const getAllHotels = asyncHandler(async (req, res) => {

    /*
     # Desc: get all hotel data 
     # Route: POST /api/admin/get-hotels
     # Access: private
    */

    const hotelsData = await fetchAllHotels(req.body);
    if (hotelsData) {
        res.status(200).json({ hotelsData });
    } else {
        res.status(404);
        throw new Error("Users data fetch failed.");
    }

});

const updateHotelStatus = asyncHandler(async (req, res) => {

    /*
     # Desc: Update approval status
     # Route: POST /api/admin/updateRegisterStatus
     # Access: private
    */

    const hotelId = req.body.hotelId
    if (!hotelId) {
        res.status(404);
        throw new Error("hotelId not received in request. hotel update failed.");
    }

    const hotelUpdateStatus = await updateRegisterStatus(hotelId);

    if (hotelUpdateStatus.success) {
        const response = hotelUpdateStatus.message;
        res.status(200).json({ message: response });
    } else {
        res.status(404);
        throw new Error("User update failed.");
    }
});

const deleteUserData = asyncHandler(async (req, res) => {

      /*
     # Desc: Delete user data
     # Route: POST /api/admin/delete-user
     # Access: private
    */

    const userId = req.body.userId;
    const usersDeleteStatus = await deleteUser(userId);
    if (usersDeleteStatus.success) {
        const response = usersDeleteStatus.message;
        res.status(200).json({ message: response });
    } else {
        res.status(404);
        const response = usersDeleteStatus.message;
        throw new Error(response);
    }
});


const updateUserData = asyncHandler(async (req, res) => {

      /*
     # Desc: Update user data
     # Route: POST /api/admin/update-user
     # Access: PRIVATE
    */

    const userId = req.body.userId;
    const name = req.body.name;
    const email = req.body.email;

    if (!userId) {
        res.status(404);;
        throw new Error("UserId not received in request. User update failed.");
    }

    const userData = { userId: userId, name: name, email: email };
    const usersUpdateStatus = await updateUser(userData);
    if (usersUpdateStatus.success) {
        const response = usersUpdateStatus.message;
        res.status(200).json({ message: response });
    } else {
        res.status(404);
        throw new Error("User update failed.");
    }
});

const addUser = asyncHandler(async (req, res) => {

      /*
     # Desc: add user data
     # Route: POST /api/admin/add-user
     # Access: PRIVATE
    */
    
    const { name, email, password } = req.body;
    // Check if user already exist
    const userExists = await User.findOne({ email });
    // If the user already exists, throw an error
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    // Store the user data to DB if the user dosen't exist already.
    const user = await User.create({
        name: name,
        email: email,
        password: password
    });

    if (user) {
        const registeredUserData = {
            name: user.name,
            email: user.email
        }
        res.status(201).json(registeredUserData);
    } else {
        // If user was NOT Created, send error back
        res.status(400);
        throw new Error('Invalid user data, User registration failed.');
    }
})

const block_UnblockUser = asyncHandler(async (req, res) => {

      /*
     # Desc: change user block unblock status 
     # Route: POST /api/admin/block_UnblockUser
     # Access: PRIVATE
    */
    
    const userId = req.body.userId;
    if (!userId) {
        res.status(404);
        throw new Error("UserId not received in request. User update failed.");
    }

    const usersUpdateStatus = await updateUser(userId);

    if (usersUpdateStatus.success) {
        const response = usersUpdateStatus.message;
        res.status(200).json({ message: response });
    } else {
        res.status(404);
        throw new Error("User update failed.");
    }
})


const showReportedPosts = asyncHandler(async (req, res) => {

       /*
     # Desc: fetch reported posts 
     # Route: POST /api/admin/reportedPosts
     # Access: PRIVATE
    */

    const reports = await Report.find({})
        .populate({
            path: 'reportedPost',
            populate: {
                path: 'stores',
                model: 'Restaurant',
            },
        })
        .populate('reporter')
        .exec();

    const reportedPosts = reports.map(report => ({
        image: report.reportedPost.images[0],
        title: report.reportedPost.title,
        postedUserName: report.reportedPost.stores.restaurantName,
        reportedUserName: report.reporter.name,
        reportedReason: report.reason,
        reportId: report._id,
        isReviewed: report.isReviewed
    }));
    res.status(200).json(reportedPosts);
});

const removeReportedPost = asyncHandler(async (req, res) => {

        /*
     # Desc: remove reported posts 
     # Route: POST /api/admin/removeReportedPost
     # Access: PRIVATE
    */

    const reportId = req.body.reportId;
    const report = await Report.findById(reportId);
    report.isReviewed = true;
    await report.save();
    // Update the post status as removed
    const post = await Post.findById(report.reportedPost);
    post.isRemoved = true;
    await post.save();
    res.status(200).json({ status: 'success', message: 'Report marked as reviewed' });
});

const updateUnlistStatus = asyncHandler(async (req, res) => {

         /*
     # Desc: update hotel unlisted status 
     # Route: POST /api/admin/updateUnlistStatus
     # Access: PRIVATE
    */

    const hotelId = req.body.hotelId

    if (!hotelId) {
        res.status(404);
        throw new Error("hotelId not received in request. hotel update failed.");
    }

    const hotelUpdateStatus = await updateHotelUnlistStatus(hotelId);
    if (hotelUpdateStatus.success) {
        const response = hotelUpdateStatus.message;
        res.status(200).json({ message: response });
    } else {
        res.status(404);
        throw new Error("Hotel update failed.");
    }
});

export {
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
    updateUnlistStatus
};