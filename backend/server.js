//* ===================================================== Server Configuration =====================================================

// ===================== Importing necessary modules =====================
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import cors from 'cors'
dotenv.config();
import { storeNotifications ,storeNotification } from './controllers/notificationController.js';
import { setChatUnRead , setChatUnReads } from './controllers/chatController.js';

// ===================== Importing necessary files =====================
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js'
import { notFoundErrorHandler, errorHandler } from './middlewares/errorMiddleware.js';
import path from "path";
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
app.use(express.static('./Public'));

// app.use(cors(corsOptions));  
// ========================================== Middleware's ==========================================

app.use(cookieParser()); // CookieParser Middleware

app.use(express.json()); // Body parser Middleware from Express

app.use(express.urlencoded({ extended: true })); // Form Data parser Middleware from Express


 
 
//? ===================== Routes Configuration =====================
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes); 
app.use('/api/hotel',hotelRoutes) 

if(process.env.NODE_ENV==='production'){
    const __dirname= path.resolve() 
    app.use(express.static(path.join(__dirname,'../frontend/dist')))

    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname,'..','frontend','dist','index.html')))
}else{

//? ===================== Application Home Route =====================
app.get('/', (req, res)=> {
    
    res.status(200).json(`${process.env.APPLICATION_NAME} Server and Systems are Up & Running.`);

}); 
} 

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
        socket.emit("connected")
       })
      
           // Joining a chat by taking chat room id from frontend
           socket.on("join chat", (room) => {
            socket.join(room)
            console.log("User joined Room: " + room)
        })

        socket.on('typing',(room)=>{    
            socket.in(room).emit('typing')})
        socket.on('stop typing',(room)=>{
            socket.in(room).emit('stop typing')})


           // socket.in means inside that room, emit/send message
           socket.on("new Message", (newMessageReceived) => {
            let chat = newMessageReceived?.chat
            
            if (!chat.users) return console.log("chat.users not defined")
            if (!chat.restaurants) return console.log("chat.restaurants not defined")
            
            chat.users.forEach(async(user) => {
                if (user._id == newMessageReceived.sender._id) return

                const isUserOnline = io.sockets.adapter.rooms.has(user._id);

                // If the user is not online, emit real-time message and store notification
                if (!isUserOnline) {
                    socket.in(user._id).emit("message received", newMessageReceived);

                    // Store notification in the database
                    await storeNotification(user._id, newMessageReceived);

                    //mark unread 
                    await setChatUnRead(chat._id)
                } else {
                    // The user is online, only emit real-time message
                    socket.in(user._id).emit("message received", newMessageReceived);
                }
              
            })
 

            chat.restaurants.forEach(async (user) => {

                if (user._id == newMessageReceived.sender._id) return

                  // Check if the user is online (connected to the socket)
                  const isUserOnline = io.sockets.adapter.rooms.has(user._id);

                  // If the user is not online, emit real-time message and store notification
                  if (!isUserOnline) {  
                      console.log("not online");
                      socket.in(user._id).emit("message received", newMessageReceived);

                      // Store notification in the database
                      
                      await storeNotifications(user._id, newMessageReceived); 

                      //mark unread
 
                      await setChatUnReads(chat._id) 
 
                  } else {
                      // The user is online, only emit real-time message
                      socket.in(user._id).emit("message received", newMessageReceived);
                  }
                
                // socket.in(user._id).emit("message received", newMessageReceived)
            })
        })



        socket.on("orderPlaced", (data) => {
            let orders = data.orderPlaced
            for (let i=0;i<orders.length;i++){
                socket.in(orders[i].store).emit('orderUpdate')
            }

        });

        socket.on('setupHotel',(hotelId)=>{
            socket.join(hotelId )
           
           })


           //when an order is cancelled by user 

           socket.on('cancelOrder',(storeId)=>{
            socket.in(storeId).emit('orderUpdate')
           })

           socket.on('orderAccepted',(userId)=>{
            socket.emit('orderUpdatessss')
            socket.in(userId.toString()).emit('orderUpdated')
           })


    })

    
}).catch((err)=>{
    console.log("error importing socket io",err); 
})
