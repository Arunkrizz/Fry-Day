//? ===================================================== User Authentication Middleware =====================================================

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Hotel from '../models/restaurantModel.js';



const authenticateHotel = asyncHandler( async (req, res, next) => {
   
    
    const tokenFromRequest = req.cookies.hotelJwt;
    if (tokenFromRequest) {
       
        try {
            // Decode the jwt token using the secret key in the server
            const decodedTokenData = jwt.verify( tokenFromRequest, process.env.JWT_SECRET_KEY_HOTEL);
            
            // If the Token is valid, search the Db with the userId obtained after decoding jwt payload
            const requestHotel = await Hotel.findById(decodedTokenData.hotelId).select('-password');
            

            if (requestHotel) {
                if (!requestHotel.approved) {
                    return res.status(403).json({ error: { message: 'Authentication failed. Restaurant is not Approved.' } });
                }
              
                req.hotel = requestHotel; // Set the request user with the user data fetched from the Db
                next(); // Proceed to next process

            }

        } catch (error) {            
            res.status(401);
            throw new Error(`Authentication Failed. Invalid token found`);
        }

    } else {
        res.status(401);
        throw new Error(`Authentication Failed. No token found`);
    }

});


export default authenticateHotel;

