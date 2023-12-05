//* ===================================================== Server Configuration =====================================================

// ===================== Importing necessary modules =====================
import express from 'express';
import dotenv from 'dotenv';
// import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
// import cors from 'cors'
dotenv.config();



// ===================== Importing necessary files =====================
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js'
import { notFoundErrorHandler, errorHandler } from './middlewares/errorMiddleware.js';



// Server port configuration
const PORT = process.env.PORT || 5000;

// Express app configuration
const app = express();

// =======================================================================================
// const corsOptions = {
//     origin: 'http://localhost:3000', // Replace with the actual origin of your React app
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   };
//=========================================================================================

// ===================== Database Configuration =====================
import connectDB from './config/db.js';

connectDB();

// ===================== Setting Static Folder =====================
app.use(express.static('backend/Public'));

// app.use(cors(corsOptions));
// ========================================== Middleware's ==========================================

app.use(cookieParser()); // CookieParser Middleware

app.use(express.json()); // Body parser Middleware from Express

app.use(express.urlencoded({ extended: true })); // Form Data parser Middleware from Express

// app.use(fileUpload())

//? ===================== Application Home Route =====================
app.get('/', (req, res)=> {
    
    res.status(200).json(`${process.env.APPLICATION_NAME} Server and Systems are Up & Running.`);

}); 


//? ===================== Routes Configuration =====================
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hotel',hotelRoutes)



//? ===================== Error handler middleware configuration =====================
app.use(notFoundErrorHandler);
app.use(errorHandler);



//NOTE ===================== Starting Server =====================
const server =app.listen(PORT, ()=> {

    console.log(`${process.env.APPLICATION_NAME} SERVER is LIVE & Listening on PORT ${PORT}.........`);

}); 

import ("socket.io").then((socketIO)=>{
    const io = new socketIO.Server(server,{
        pingTimeout:60000, // amount of time to wait b4 being inactive to save bandwidth
        cors:{
            origin:"http://localhost:3000"
        }
    })

    io.on("connection",(socket)=>{
        console.log("connected to socket.io");

       socket.on('setup',(userData)=>{
        socket.join(userData )
        // console.log(userData,"socketio")
        socket.emit("connected")
       })
      
           // Joining a chat by taking chat room id from frontend
           socket.on("join chat", (room) => {
            socket.join(room)
            console.log("User joined Room: " + room)
        })

           // socket.in means inside that room, emit/send message
           socket.on("new Message", (newMessageReceived) => {
            let chat = newMessageReceived.chat
            console.log(newMessageReceived,"newMessageReceived");
            
            if (!chat.users) return console.log("chat.users not defined")
            
            chat.users.forEach((user) => {
                if (user._id == newMessageReceived.sender._id) return
                
                socket.in(user._id).emit("message received", newMessageReceived)
            })
            chat.restaurants.forEach((user) => {
                if (user._id == newMessageReceived.sender._id) return
                
                socket.in(user._id).emit("message received", newMessageReceived)
            })
        })


    })
}).catch((err)=>{
    console.log("error importing socket io",err);
})
