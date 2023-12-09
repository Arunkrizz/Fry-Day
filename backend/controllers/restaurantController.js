import asyncHandler from 'express-async-handler';
import Restaurant from '../models/restaurantModel.js';
import { v4 as uuidv4 } from 'uuid'
import generateHotelToken from '../utils/jwtConfig/hoteljwtConfig/generateHotelToken.js'
import destroyHotelToken from '../utils/jwtConfig/hoteljwtConfig/destroyHotelToken.js';
import bcrypt from "bcryptjs";



const login = asyncHandler(async(req,res)=>{
console.log(req.body,"login");

const email =req.body.email
const password = req.body.password


if ( !email || !password ) {

    // If email or password is empty, return error

    res.status(401);

    throw new Error('Email or Password is missing in the request, User authentication failed.');

}

// Find the user in Db with the email and password
const hotelInfo = await Restaurant.findOne({ Email: email});

let passwordValid = false;

if (hotelInfo) {

    passwordValid = await hotelInfo.matchPassword(password);

}

if ( passwordValid ) {

    // If user is created, send response back with jwt token

    generateHotelToken(res, hotelInfo._id); // Middleware to Generate token and send it back in response object

    let registeredHotelData = {
        hotelInfo
    }

 

    res.status(201).json(registeredHotelData);

} 

if( !hotel || !passwordValid ) {

    // If user or user password is not valid, send error back

    res.status(401);

    throw new Error('Invalid Email or Password, hotel authentication failed.');

}


})

const logout = asyncHandler(async (req, res) => {
console.log(res,"logout ")

destroyHotelToken(res);

res.status(200).json({message: 'Hotel Logged Out'});

})

const register2 =asyncHandler(async (req, res) => {

    const password =req.body.Password
    
    const salt = await bcrypt.genSalt(10);

    // Hashing the new password using the salt generated by bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);
        console.log(req.body,"reg2")
        const hotel= await Restaurant.findByIdAndUpdate(req.body.Id, { Email: req.body.Email,Password:hashedPassword})

        res.status(201).json(hotel);

        
        console.log(hotel,"reqq")
 
})

const register = asyncHandler(async (req, res) => {

    try {

        // let hotel=uuidv4()
        // let menu=uuidv4()
        // let food=uuidv4()
        
        let foodImage=[]
        let hotelImage=[]
        let menuImage=[]

        console.log(req.body, "postdetails");
        console.log(req.files, "in here multer");


        const imager = () => {

            console.log([req.files['RestaurantImages']][0],"immg");

            if (req.files) {

                const restaurantImages = [req.files['RestaurantImages']][0];
                const menuImages = [req.files['menuImages']][0];
                const foodImages = [req.files['foodImages']][0];

                // console.log(restaurantImages,menuImages,foodImages,"entered");
                // const destinationPath = './public/product-images/';


                for (let i = 0; i < restaurantImages.length; i++) {
                    console.log(restaurantImages,restaurantImages[i],"resImgges");
                if (restaurantImages[i]) {
                    let hotel=uuidv4()
                    hotelImage.push(hotel+".jpg")
                    const image = restaurantImages[i];
                   
                    // console.log(image,restaurantImages.length,"img")
                    const movePromise = new Promise((resolve, reject) => {
                        image.mv('backend/Public/restaurantImages/' + hotel+ '.jpg', (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });

                }
                if (menuImages[i]) {

                    let menu=uuidv4()
                    menuImage.push(menu+".jpg")
        
                    const image = menuImages[i];
                  
                    // console.log(image,menuImages.length,"menuImages")
                    const movePromise = new Promise((resolve, reject) => {
                        image.mv('backend/Public/restaurantImages/'+ menu + '.jpg', (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });

                }
                if (foodImages[i]) {
                    const image = foodImages[i];
                    let food=uuidv4()
                    foodImage.push(food+".jpg")
                    console.log(foodImage,"food")
                    const movePromise = new Promise((resolve, reject) => {
                        image.mv('backend/Public/restaurantImages/' + food + '.jpg', (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    });

                }




                }

                // Wait for all file moves to complete

            } else {
                // Handle case where no images were uploaded
                // ...
            }
        }
        imager()


        const restaurant = await Restaurant.create({
            restaurantName: req.body.restaurantName,
            restaurantAddress: req.body.restaurantAddress,
            ownerName: req.body.ownerName,
            ownerEmail: req.body.ownerEmail,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            mobile: req.body.mobile,
            dineAndDelivery: req.body.dineAndDelivery,
            describeOutlet: req.body.describeOutlet,
            cuisineType: req.body.cuisineType,
            restaurantImages: hotelImage,
            menuImages: menuImage,
            foodImages: foodImage,
        });

    

        if (restaurant) {
            console.log(restaurant,"restaurant")
            // If user is created, send response back with jwt token
    
            generateHotelToken(res, restaurant._id); // Middleware to Generate token and send it back in response object
    
            const registeredHotelData = {
                hotelInfo:restaurant
            }

            console.log(registeredHotelData,"reg res data response")
    
            res.status(201).json(registeredHotelData);
    
        }else {
    
            // If user was NOT Created, send error back
    console.log("error reg user ")
            res.status(400);
    
            throw new Error('Invalid user data, User registration failed.');
        
        }
    

    }
    catch (error) {
        console.log(error.message);
    }


})

const updateLiveBrodcastRoomId =asyncHandler(async(req,res)=>{

    console.log(req.body,"room id update")

   await  Restaurant.findByIdAndUpdate(req.body.hotelInfo,{
        $set:{liveRoom:req.body.roomId}
    })

})




export {

    register,
    register2,
    logout,
    login,
    updateLiveBrodcastRoomId

};