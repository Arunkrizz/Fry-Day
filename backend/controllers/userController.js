//? ===================================================== User Controller =====================================================


// ===================== Importing necessary modules/files =====================
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateUserToken from '../utils/jwtConfig/userJwtConfig/generateUserToken.js';
import destroyUserToken from '../utils/jwtConfig/userJwtConfig/destroyUserToken.js';
import Posts from '../models/postModel.js'
import Product from '../models/productModel.js'
import Hotel from '../models/restaurantModel.js'

const getUserViewPosts = asyncHandler(async (req,res)=>{
    // console.log("viewwww")

    const Post = await Posts.find({})

    if(Post){

        res.status(200).json({ Post });

    }else{

        res.status(404);

        throw new Error("Post data fetch failed.");

    }

    // console.log(Post,"possttt")
    
})

const authUser = asyncHandler ( async (req, res) => {
  
console.log(req.body,"login auth ");
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
            id:user._id
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
    // console.log("jjjjj");
    // console.log(req.body,"login gauth ");
        /*
         # Desc: Auth user/set token
         # Route: POST /api/users/auth
         # Access: PUBLIC
        */
    
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
                id:user._id
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
console.log(req.body,"reg user /")

const { userName, userPicture, userEmail} = req.body;

// Check if user already exist
const userExists = await User.findOne({email: userEmail });

// If the user already exists, throw an error
if (userExists) {
    console.log("userexists")

    res.status(400);
    
    throw new Error('User already exists');

}

// Store the user data to DB if the user dosen't exist already.
console.log("kk")
const user = await User.create({
    name: userName,
    email: userEmail,
    profileImageName: userPicture,
    
});


if (user) {
    console.log(user,"userrr")
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

})

const registerUser = asyncHandler ( async (req, res) => {

    /*
     # Desc: Register new user
     # Route: POST /api/users/auth
     # Access: PUBLIC
    */
console.log(req.body,"reg user /")
    const { userRegisterName, userRegisterEmail, userRegisterPassword,userRegisterMobile} = req.body;
    
    // Check if user already exist
    const userExists = await User.findOne({email: userRegisterEmail });
    
    // If the user already exists, throw an error
    if (userExists) {
        console.log("userexists")

        res.status(400);
        
        throw new Error('User already exists');

    }

    // Store the user data to DB if the user dosen't exist already.
    console.log("kk")
    const user = await User.create({
        name: userRegisterName,
        email: userRegisterEmail,
        password: userRegisterPassword,
        mobile:userRegisterMobile
    });

    
    if (user) {
        console.log(user,"userrr")
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

    /*
     # Desc: Update user profile
     # Route: PUT /api/users/profile
     # Access: PRIVATE
    */

    // Find the user data with user id in the request object
    const user = await User.findById(req.user._id);

    if (user) {
    
        // Update the user with new data if found or keep the old data itself.
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // If request has new password, update the user with the new password
        if (req.body.password) {

            user.password = req.body.password
        
        }

        if(req.file){
            console.log(req.file,"filessss");

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

});

const getHotelProducts = asyncHandler (async (req,res)=>{
    // console.log(req.body,"res prodss")

    const products = await Product.find({stores:req.body._id})

 
if (products) {

    res.status(201).json(products);

}else {

    res.status(400).json({products:null});

}

    // console.log(products,"hotel proddss")
});

const getHotelLocation = asyncHandler(async(req,res)=>{
    // console.log(req.body,"location")
    
    const hotel = await Hotel.find({_id:req.body._id})

    // console.log(hotel,"hotel")

    if(hotel){
        res.status(200).json({lat:hotel[0].latitude,lng:hotel[0].longitude})
    }
    else {
        res.status(400).json({hotelLocation:null});
    }

})

const getHotelDetails = asyncHandler(async(req,res)=>{
    // console.log(req.body,"htl details");
    const hotel = await Hotel.findById(req.body.id)
    if(hotel){
        res.status(200).json(hotel)
    }
    else {
        res.status(400).json({hotelLocation:null});
    }
    // console.log(hotel,"resssss")
})

const checkBlock = asyncHandler(async (req, res) => {
    // console.log(req.body,"check block")
    const users = await User.findById(req.body.id)
    if (users) {
        // console.log(users,"blocked stat")
    res.status(200).json(users)
}
    
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
    checkBlock

};