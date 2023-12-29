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
        console.log("error in ref jwt ", error);
        throw new Error(error );
        // res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

}



const authenticateUser = asyncHandler(async (req, res, next) => {
    console.log('authenticateUser');

    const tokenFromRequest = req.cookies.userJwt;

    if (tokenFromRequest) {
        // console.log('tokenFromRequest authenticateUser');
        try {

            // Decode the jwt token using the secret key in the server
            const decodedTokenData = jwt.verify(tokenFromRequest, process.env.JWT_SECRET_KEY_USER);

            // If the Token is valid, search the Db with the userId obtained after decoding jwt payload
            const requestUser = await User.findById(decodedTokenData.userId).select('-password');

            if (requestUser) {
                // console.log('requestUser authenticateUser');

                if (requestUser.is_blocked) {
                    console.log("blocked user");
                    res.status(401)
                    // throw new Error('Your account lll is blocked')
                    // res.status(400)
                    throw new Error(`Your Account is blocked.`)
                    // return res.status(403).json({ error: { message: 'Your this Account is blocked.' } });
                }

                req.user = requestUser; // Set the request user with the user data fetched from the Db
                // console.log("userAuth");
                next(); // Proceed to next process

            }

        } catch (error) {
            console.log("error jwt");
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
                                console.log("blocked user");
                                res.status(401)
                                // throw new Error('Your account lll is blocked')
                                // res.status(400)
                                // throw new Error(`Your Account is blocked.`)
                                // return res.status(403).json({ error: { message: 'Your this Account is blocked.' } });
                            }

                            req.user = requestUser; // Set the request user with the user data fetched from the Db
                            // console.log(requestUser, "userAuth ref jwt");
                            // res.redirect('/login');
                            next(); // Proceed to next process
                        } else {
                            // res.redirect('/login');
                            res.status(401);
                            throw new Error(`Authentication  failed.`)
                        }



                        // console.log(data, "chkrfrsh then");
                    }).catch((err) => {
                        console.log("errorre",err, "ref err");
                        res.status(401).json({ message: 'Token expired or invalid. Please log in again.' });
                        return;
                    })

                } else {
                    res.status(401);
                    throw new Error(`Authentication  failed. You are Blocked`)
                }
            }
            // res.status(401);

            // throw new Error(`Authentication  failed. You are Blocked`)
        }

    } else {

        res.status(401);

        throw new Error(`Authentication Failed. No token found`);

    }

});


export default authenticateUser;

