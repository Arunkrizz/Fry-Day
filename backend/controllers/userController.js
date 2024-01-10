//? ===================================================== User Controller =====================================================


// ===================== Importing necessary modules/files =====================
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateUserToken from '../utils/jwtConfig/userJwtConfig/generateUserToken.js';
import destroyUserToken from '../utils/jwtConfig/userJwtConfig/destroyUserToken.js';
import Posts from '../models/postModel.js'
import Product from '../models/productModel.js'
import Hotel from '../models/restaurantModel.js'
import OTPVerification from '../models/otpModel.js'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';
import Report from '../models/reportModel.js';
import { log } from 'util';

const getUserViewPosts = asyncHandler(async (req,res)=>{
    const { offset = 2, limit = 2 } = req.body;
    const Post = await Posts.aggregate([
        {
          $match: {
            isRemoved: false
          }
        },
        {
          $lookup: {
            from: "restaurants",
            localField: "stores",
            foreignField: "_id",
            as: "stores"
          }
        },
        {
            $lookup: {
              from: "users",
              localField: "likes",
              foreignField: "_id",
              as: "likes"
            }
          },
        
        {
          $match: {
            "stores.approved": "true"
          }
        },
        {
            $sort: {
              dateListed: -1
            }
          },
          {
            $skip: offset
          },
          {
            $limit: limit
          }
      ])

    if(Post){
        res.status(200).json({ Post });
    }else{
        res.status(404);
        throw new Error("Post data fetch failed.");
    }    
})

const authUser = asyncHandler ( async (req, res) => {
      /*
     # Desc: Auth user/set token
     # Route: POST /api/users/auth
     # Access: PUBLIC
    */
    const { userEmail, userPassword } = req.body;

    if ( !userEmail || !userPassword ) {

        // If email or password is empty, return error

        res.status(401);

        throw new Error('Email or Password is missing in the request, User authentication failed.');

    }

    // Find the user in Db with the email and password
    const user = await User.findOne({ email: userEmail});

    let passwordValid = false;
    
    if (user) {

        passwordValid = await user.matchPassword(userPassword);

    }

    if ( passwordValid ) {

        // If user is created, send response back with jwt token

        generateUserToken(res, user._id); // Middleware to Generate token and send it back in response object

        let registeredUserData = {
            name: user.name,
            email: user.email,
            id:user._id,
            verified:user.verified,
            address:{
                    name:user.address.name,
                    streetName:user.address.streetName,
                    locality:user.address.locality,
                    mobile:user.address.mobile,
                    latitude:user.address.latitude,
                    longitude:user.address.longitude,
            }
        }

        if(user.profileImageName){

            registeredUserData.profileImageName = user.profileImageName;
            
        }

        res.status(201).json(registeredUserData);

    } 
    
    if( !user || !passwordValid ) {

        // If user or user password is not valid, send error back

        res.status(401);

        throw new Error('Invalid Email or Password, User authentication failed.');
    
    }

});

const gAuthUser = asyncHandler ( async (req, res) => {

        /*
         # Desc: Auth user/set token
         # Route: POST /api/users/auth
         # Access: PUBLIC
        */
    
         console.log(req.body,"gauth login")
        const { userEmail } = req.body;
    
        if ( !userEmail  ) {
    
            // If email or password is empty, return error
    
            res.status(401);
    
            throw new Error('Email is missing in the request, User authentication failed.');
    
        }
    
        // Find the user in Db with the email and password
        const user = await User.findOne({ email: userEmail});
    
       
    
        if ( user ) {
    
            // If user is created, send response back with jwt token
    
            generateUserToken(res, user._id); // Middleware to Generate token and send it back in response object
    
            let registeredUserData = {
                name: user.name,
                email: user.email,
                id:user._id,
                verified:true,
                address:{
                    name:user.address.name,
                    streetName:user.address.streetName,
                    locality:user.address.locality,
                    mobile:user.address.mobile,
                    latitude:user.address.latitude,
                    longitude:user.address.longitude,
            }
            }

   
    
            if(user.profileImageName){
    
                registeredUserData.profileImageName = user.profileImageName;
                
            }
    
            res.status(201).json(registeredUserData);
    
        } 
        
        if( !user  ) {
    
            // If user or user password is not valid, send error back
    
            res.status(401);
    
            throw new Error('Invalid Email or Password, User authentication failed.');
        
        }
    
    });

const gAuthRegister = asyncHandler (async(req,res)=>{
    /*
     # Desc: Register new user
     # Route: POST /api/users/auth
     # Access: PUBLIC
    */

const { userName, userPicture, userEmail} = req.body;

// Check if user already exist
const userExists = await User.findOne({email: userEmail });

// If the user already exists, throw an error
if (userExists) {

    res.status(400);
    
    throw new Error('User already exists');

}

// Store the user data to DB if the user dosen't exist already.
const user = await User.create({
    name: userName,
    email: userEmail,
    profileImageName: userPicture,
    verified:true
});




if (user) {
    // If user is created, send response back with jwt token

    generateUserToken(res, user._id); // Middleware to Generate token and send it back in response object

    const registeredUserData = {
        name: user.name,
        email: user.email,
        id:user._id,
        profileImageName:user. profileImageName,
        verified:true
    }

    res.status(201).json(registeredUserData);

}else {

    // If user was NOT Created, send error back
    res.status(400);

    throw new Error('Invalid user data, User registration failed.');

}

})

const registerUser = asyncHandler ( async (req, res) => {

    /*
     # Desc: Register new user
     # Route: POST /api/users/auth
     # Access: PUBLIC
    */
    const { userRegisterName, userRegisterEmail, userRegisterPassword,userRegisterMobile} = req.body;
    
    // Check if user already exist
    const userExists = await User.findOne({email: userRegisterEmail });
    
    // If the user already exists, throw an error
    if (userExists) {

        res.status(400);
        
        throw new Error('User already exists');

    }

    // Store the user data to DB if the user dosen't exist already.
    const user = await User.create({
        name: userRegisterName,
        email: userRegisterEmail,
        password: userRegisterPassword,
        mobile:userRegisterMobile
    });

    
    if (user) {
        // If user is created, send response back with jwt token

        generateUserToken(res, user._id); // Middleware to Generate token and send it back in response object

        const registeredUserData = {
            name: user.name,
            email: user.email,
            id:user._id
        }

      

        res.status(201).json(registeredUserData);

    }else {

        // If user was NOT Created, send error back
console.log("error reg user ")
        res.status(400);

        throw new Error('Invalid user data, User registration failed.');
    
    }


});

const logoutUser = asyncHandler ( async (req, res) => {

    /*
     # Desc: Logout user / clear cookie
     # Route: POST /api/users/logout
     # Access: PUBLIC
    */

    destroyUserToken(res);

    res.status(200).json({message: 'User Logged Out'});

});

const getUserProfile = asyncHandler ( async (req, res) => {

    /*
     # Desc: Get user profile
     # Route: GET /api/users/profile
     # Access: PRIVATE
    */

    const user = {

        name: req.user.name,
        email: req.user.email,
        profileImageName: req.user.profileImageName

    }

    res.status(200).json({user});

});

const updateUserProfile = asyncHandler ( async (req, res) => {

    const {  currentPassword,password,confirmPassword } = req.body;


   // Find the user data with user id in the request object
    const user = await User.findById(req.user._id);

    let valid = false;
    
    if (user) {

        if(currentPassword||password||confirmPassword){
            valid = await user.matchPassword(currentPassword);
        }else{
            valid=true
        }

        

    }

    if ( valid ) {
        if (user) {
    
            // Update the user with new data if found or keep the old data itself.
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
    
            // If request has new password, update the user with the new password
            if (req.body.password) {
    
                user.password = req.body.password
            
            }
    
            if(req.file){    
                user.profileImageName = req.file.filename || user.profileImageName;
            }
    
            const updatedUserData = await user.save();
    
            // Send the response with updated user data
            res.status(200).json({
    
                name: updatedUserData.name,
                email: updatedUserData.email,
                profileImageName: updatedUserData.profileImageName
    
            });
    
        } else {
    
            res.status(404);
    
            throw new Error("Requested User not found.");
    
        };
    }else {
         // If password is wrong, return error

        res.status(401);
        throw new Error('current Password doesnt match');
    }

    /*
     # Desc: Update user profile
     # Route: PUT /api/users/profile
     # Access: PRIVATE
    */

});

const getHotelProducts = asyncHandler (async (req,res)=>{

    console.log(req.body,"get hote lprod bck end ")

    const products = await Product.find({stores:req.body._id})
if (products) {
    res.status(201).json(products);
}else {
    res.status(400).json({products:null});
}
});

const getHotelLocation = asyncHandler(async(req,res)=>{
    
    const hotel = await Hotel.find({_id:req.body._id})

    if(hotel){
        res.status(200).json({lat:hotel[0].latitude,lng:hotel[0].longitude})
    }
    else {
        res.status(400).json({hotelLocation:null});
    }

})

const getHotelDetails = asyncHandler(async(req,res)=>{
    const hotel = await Hotel.findById(req.body.id)
    if(hotel){
        res.status(200).json(hotel)
    }
    else {
        res.status(400).json({hotelLocation:null});
    }
})

const checkBlock = asyncHandler(async (req, res) => {
    console.log(req.body,"chk block bckend")
    const users = await User.findById(req.body.id)
    if (users) {
    res.status(200).json(users)
}
    
})

const verifyMail = asyncHandler(async(req,res)=>{
  
    const userExists = await User.findOneAndUpdate({email: req.body.email },{$set:{verified:true}}).then(
        res.status(200)
    ).catch(
        res.status(400)
    )

})

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "adforad1331@gmail.com",
        pass: "wicz zhio cpjc stwc"
    }
})

const sendOtpVerification = asyncHandler(async ({_id, email}, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

        // mail options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: `<p>Your OTP is <b>${otp}</b></p><p>This code <b>expires in one minute</b></p>`
        };

        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOtpVerification = new OTPVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 60000
        });

        // save otp record
        await newOtpVerification.save();

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("it has an error", err);
            } else {
                console.log("email has send");
            }
        });

    } catch (error) {
        res.json({
            status: "Failed",
            message: error.message
        });
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email, verified: true })
    if (!user) {
        res.status(401);
        throw new Error('User not found, User authentication failed, Please SignUp again');
    } else {
        generateUserToken(res, user._id)
        sendOtpVerification(user, res)
        res.status(200).json({message: "email otp send"})
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const newPassword = req.body.password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        throw new Error("Password Should Contain atleast 8 characters,one number and a special character")
    }

    const user = await User.findById(req.user._id);

    if (req.body.password) {
        user.password = newPassword
    }

    const updatedUserData = await user.save();
    res.status(200).json({message: "password updated"})
})

const verifyOtp = asyncHandler(async (req, res) => {
    let otp = req.body.otp
    let userId = req.user._id
    if (!otp) {
        throw new Error ("Empty Otp details are not allowed")
    } else {
        const UserOtpVerificationRecords = await OTPVerification.find({ userId })
        if (UserOtpVerificationRecords.length <= 0) {
            throw new Error ("Account record doesn't exist or has been verified. Please signup or login")
        } else {
            const { expiresAt } = UserOtpVerificationRecords[0]
            const hashedOTP = UserOtpVerificationRecords[0].otp

            if (expiresAt < Date.now()) {
                await OTPVerification.deleteMany({ userId })
                throw new Error('Otp expired')
            } else {
                const validOTP = await bcrypt.compare(otp, hashedOTP)

                if (!validOTP) {
                    throw new Error ("Invalid OTP. Check your inbox.")
                } else {
                    await User.updateOne({ _id: userId }, { verified: true })
                    await OTPVerification.deleteMany({ userId })
                    // res.status(201).json('user email verified successfully')
                    let registeredUserData = {
                        name: req.user.name,
                        email: req.user.email,
                        id: req.user._id
                    }
                    res.status(201).json(registeredUserData)
                }
            }
        }
    }
})

const resendOtp = asyncHandler(async (req, res) => {
    let userId = req.user._id
    let email = req.user.email

    if (!userId || !email) {
        throw new Error("No user Details")
    } else {
        await OTPVerification.deleteMany({ userId })
        sendOtpVerification({ _id: userId, email }, res)
        res.status(200).json({"message": "otp resended"})
    }
})

const fetchRestaurantDatas=asyncHandler(async(req,res)=>{
    const hotels =await Hotel.find({})
    res.status(200).json(hotels)
})

const likePost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;
    const post = await Posts.findById(postId)

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    if (!post.likes.includes(userId)) {
        post.likes.push(userId);
      }

    await post.save()
    await post.populate("likes")

    res.status(200).json({ message: 'Like added successfully', likes: post.likes })
})

const unlikePost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;
    const post = await Posts.findById(postId).populate("likes")

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    const indexOfUser = post.likes.findIndex((like) => like._id.equals(userId));
    // log(indexOfUser, userId,"i of user unlike")
    if (indexOfUser === -1) {
        return res.status(400).json({ message: 'User has not liked the post' });
    }

    // Remove the user from the likes array
    post.likes.splice(indexOfUser, 1);
    await post.save();

    res.status(200).json({ message: 'Like removed successfully', likes: post.likes });
})

const commentPost = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;
    const text = req.body.text;
    const post = await Posts.findById(postId)

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    // Find the user and populate the necessary fields
    const user = await User.findById(userId).select('_id name profileImageName');

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const newComment = {
        user: user, // Assign the populated user
        text,
        date: new Date()
    }

    post.comments.push(newComment);
  
    await post.save();
    // Fetch the newly added comment from the post object
    const addedComment = post.comments[post.comments.length - 1];

    res.status(200).json({ message: 'Comment added successfully', comment: addedComment });
});

const commentDelete = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.body.commentId;
    const result = await Posts.updateOne(
      { _id: postId },
      { $pull: { comments: { _id: commentId } } }
    );
    if (result.modifiedCount > 0) {
        console.log('Comment deleted successfully');
        res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
        console.log('Comment not found or deletion unsuccessful');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const reportPost = asyncHandler(async (req, res) => {
    
    const { postId, data } = req.body;
    const { reason } = data || {};

    const reporter = req.user._id;
    const post = await Posts.findById(postId)

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    
    const newReport = new Report({
      reporter,
      reportedPost: postId,
      reason,
      
    });

    await newReport.save();

    post.reports.push(newReport);
    await post.save();

    res.status(201).json({ message: 'Report submitted successfully' })
})

const changeAddress=asyncHandler(async(req,res)=>{


    const user = await User.findById(req.user._id);

    if (user) {
        // Update the user with new data if found or keep the old data itself.
        user.address.name = req.body.name || user.address.name
        user.address.streetName= req.body.streetName || user.address.streetName
        user.address.locality= req.body.locality || user.address.locality
        user.address.mobile= req.body.mobile || user.address.mobile
        user.address.latitude= req.body.latitude || user.address.latitude
        user.address.longitude= req.body.longitude || user.address.longitude

        const updatedUserData = await user.save();

        // Send the response with updated user data
        res.status(200).json({
            id: updatedUserData._id,
            name: updatedUserData.name,
            email: updatedUserData.email,
            profileImageName: updatedUserData.profileImageName,
            address:{
                name:updatedUserData.address.name,
                streetName:updatedUserData.address.streetName,
                locality:updatedUserData.address.locality,
                mobile:updatedUserData.address.mobile,
                latitude:updatedUserData.address.latitude,
                longitude:updatedUserData.address.longitude,
            }

        });

    } else {

        res.status(404);

        throw new Error("Requested User not found.");

    };
})




export {
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
    changeAddress
};