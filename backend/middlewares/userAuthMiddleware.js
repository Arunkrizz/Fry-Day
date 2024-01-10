//? ===================================================== User Authentication Middleware =====================================================

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const checkRefreshToken = async (refreshToken) => {

    try {
        const decodedTokenData = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
        const user = await User.findById(decodedTokenData.userId).select('-password');

        if (user) {
            const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY_USER, { expiresIn: process.env.JWT_TOKEN_DURATION });
            //   res.cookie('userJwt', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV !== 'development', sameSite: 'strict', maxAge: 30 * 24 * 60 * 60 * 1000 });
            //   res.status(200).json({ success: true, accessToken: newAccessToken });
            return newAccessToken
        } else {

            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error(error );
    }

}



const authenticateUser = asyncHandler(async (req, res, next) => {

    const tokenFromRequest = req.cookies.userJwt;

    console.log(tokenFromRequest,"auth user jwt")

    if (tokenFromRequest) {
        try {

            // Decode the jwt token using the secret key in the server
            const decodedTokenData = jwt.verify(tokenFromRequest, process.env.JWT_SECRET_KEY_USER);

            // If the Token is valid, search the Db with the userId obtained after decoding jwt payload
            const requestUser = await User.findById(decodedTokenData.userId).select('-password');

            if (requestUser) {

                if (requestUser.is_blocked) {
                    res.status(401)
                    throw new Error(`Your Account is blocked.`)
                }

                req.user = requestUser; // Set the request user with the user data fetched from the Db
                next(); // Proceed to next process

            }

        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                const refreshToken = req.cookies.userRefreshToken;
                if (refreshToken) {
                    checkRefreshToken(refreshToken).then(async (data) => {
                        const newAccessToken = data
                        res.cookie('userJwt', newAccessToken, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            sameSite: 'strict',
                            maxAge: 30 * 24 * 60 * 60 * 1000,
                        });

                        const decodedTokenData = jwt.verify(newAccessToken, process.env.JWT_SECRET_KEY_USER);

                        // If the Token is valid, search the Db with the userId obtained after decoding jwt payload
                        const requestUser = await User.findById(decodedTokenData.userId).select('-password');

                        if (requestUser) {

                            if (requestUser.is_blocked) {
                                res.status(401)
                               
                            }

                            req.user = requestUser; // Set the request user with the user data fetched from the Db
                          
                            next(); // Proceed to next process
                        } else {
                            res.status(401);
                            throw new Error(`Authentication  failed.`)
                        }

                    }).catch((err) => {
                        res.status(401).json({ message: 'Token expired or invalid. Please log in again.' });
                        return;
                    })

                } else {
                    res.status(401);
                    throw new Error(`Authentication  failed. You are Blocked`)
                }
            }
        }

    } else {

        res.status(401);

        throw new Error(`Authentication Failed. No token found`);

    }

});


export default authenticateUser;

