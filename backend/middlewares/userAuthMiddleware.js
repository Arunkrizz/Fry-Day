//? ===================================================== User Authentication Middleware =====================================================

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';



const authenticateUser = asyncHandler( async (req, res, next) => {

    const tokenFromRequest = req.cookies.userJwt;

    if (tokenFromRequest) {
    
        try {
            
            // Decode the jwt token using the secret key in the server
            const decodedTokenData = jwt.verify( tokenFromRequest, process.env.JWT_SECRET_KEY_USER);

            // If the Token is valid, search the Db with the userId obtained after decoding jwt payload
            const requestUser = await User.findById(decodedTokenData.userId).select('-password');

            if (requestUser) {

                // if (requestUser.is_blocked) {
                //     console.log("blocked user");
                //     res.status(401)
                //     // throw new Error('Your account lll is blocked')
                //     // res.status(400)
                //     throw new Error(`Your Account is blocked.`)
                //     // return res.status(403).json({ error: { message: 'Your this Account is blocked.' } });
                // }
            
                req.user = requestUser; // Set the request user with the user data fetched from the Db
                // console.log("userAuth");
                next(); // Proceed to next process
 
            }

        } catch (error) {
            
            res.status(401);

            throw new Error(`Authentication  failed. You are Blocked`)
        }

    } else {

        res.status(401);

        throw new Error(`Authentication Failed. No token found`);

    }

});


export default authenticateUser;

