import asyncHandler from 'express-async-handler'
import ChatRoom from '../models/chatModel.js'
import User from '../models/userModel.js'
import Message from '../models/messageModel.js'
import Hotel from '../models/restaurantModel.js'

///////////////////////////////////////////////////// User chat //////////////////////////////////////////////////////


const markAsReadUpdate = asyncHandler(async (req, res) => {

    const chatId = req.body.data
    const chat = await ChatRoom.findByIdAndUpdate(
        chatId,
        {
            $set: { "read.users.read": false },
        },
        { new: true }
    );
})

const readMessagesUpdate = asyncHandler(async (req, res) => {

    const chatId = req.params.chatId
    const chat = await ChatRoom.findByIdAndUpdate(
        chatId,
        {
            $set: { "read.users.read": true },
        },
        { new: true }
    );
})
const setChatUnRead = asyncHandler(async (chatId) => {
    const chat = await ChatRoom.findByIdAndUpdate(
        chatId,
        {
            $set: { "read.users.read": true },
            $inc: { "read.users.count": 1 },
        },

        { new: true }
    );
    if (chat) {
    } else {
        console.log("no chat found ");
    }
})

// desc   Access particular chatRoom or create a new chatRoom
// route  POST /api/users/accessChat
// access Private
const accessChat = asyncHandler(async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        console.log("UserId param not send with request")
        return res.status(400)
    }

    let isChat = await ChatRoom.find({
        users: { $elemMatch: { $eq: req.user._id } },
        restaurants: { $elemMatch: { $eq: userId } }
    })
        .populate("users", "-password")
        .populate("restaurants", "-Password") // populate restaurant ;P
        .populate("latestMessage")



    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name profileImageName "
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        let chatData = {
            chatName: "sender",
            users: [req.user._id],
            restaurants: [userId]
        }
        try {
            const createChat = await ChatRoom.create(chatData)
            const fullChat = await ChatRoom.findOne({ _id: createChat._id }).populate("users", "-password").populate("restaurants", "-Password")
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

// desc   Access all chatRooms of the user
// route  GET /api/users/fetchChats
// access Private
const fetchChats = asyncHandler(async (req, res) => {
    try {
        ChatRoom.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("restaurants", "-Password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name profilePictureName "
                })
                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})


// desc   Send New Message
// route  POST /api/users/sendMessage
// access Private
const sendMessage = asyncHandler(async (req, res) => {
    let senderId = 'j'
    const { content, chatId, type } = req.body
    if (!content || !chatId) {
        console.log("Invalid data passed into request")
        return res.sendStatus(400)
    }
    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
        senderType: type
    }

    try {
        let message = await Message.create(newMessage)
        message = await message.populate("sender", "name profileImageName")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "name profileImageName email"
        })
        message = await Hotel.populate(message, {
            path: "chat.restaurants",
            select: "restaurantName restaurantImages"
        },

        )
        await ChatRoom.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

// desc   Fetch All Messages for a Chat
// route  POST /api/users/allMessages/:chatId
// access Private
const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name profileImageName email restaurantName restaurantImages")
            .populate("chat")
        res.status(200).json(messages)
    } catch (error) {
        res.status(400)
        throw new Error
    }
})

/////////////////////////////////////////////////////Restaurants chat //////////////////////////////////////////////////////

const markAsReadUpdates = asyncHandler(async (req, res) => {

    const chatId = req.body.data
    const chat = await ChatRoom.findByIdAndUpdate(
        chatId,
        {
            $set: { "read.restaurants.read": false },
        },

        { new: true }
    );
})

const readMessagesUpdates = asyncHandler(async (req, res) => {

    const chatId = req.params.chatId
    const chat = await ChatRoom.findByIdAndUpdate(
        chatId,
        {
            $set: { "read.restaurants.read": true },
        },

        { new: true }
    );
})


const setChatUnReads = asyncHandler(async (chatId) => {
    const chat = await ChatRoom.findByIdAndUpdate(
        chatId,
        {
            $set: { "read.restaurants.read": true },
        },
        { new: true }
    );
    if (chat) {
    } else {
        console.log("no chat found ");
    }
})

const accessChats = asyncHandler(async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        console.log("UserId param not send with request")
        return res.status(400)
    }

    let isChat = await ChatRoom.find({
        restaurants: { $elemMatch: { $eq: req.hotel._id } },
        users: { $elemMatch: { $eq: userId } }
    })

        .populate("users", "-password")
        .populate("restaurants", "-Password") // populate restaurant ;P
        .populate("latestMessage")

    isChat = await Hotel.populate(isChat, {
        path: "latestMessage.sender",
        select: "restaurantName restaurantImages "
    })

    if (isChat.length > 0) {
        res.send(isChat[0])
    } else {
        let chatData = {
            chatName: "sender",
            restaurants: [req.hotel._id],
            users: [userId]
        }
        try {
            const createChat = await ChatRoom.create(chatData)
            const fullChat = await ChatRoom.findOne({ _id: createChat._id }).populate("users", "-password").populate("restaurants", "-Password")
            res.status(200).send(fullChat)
        } catch (error) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

const fetchChatss = asyncHandler(async (req, res) => {
    try {
        const chat = await ChatRoom.find({ restaurants: { $elemMatch: { $eq: req.hotel._id } } })

            .populate("users", "-password")
            .populate("restaurants", "-Password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await Hotel.populate(results, {
                    path: "latestMessage.sender",
                    select: "restaurantName restaurantImages "
                })
                res.status(200).send(results)
            })
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

const sendMessages = asyncHandler(async (req, res) => {

    const { content, chatId, type } = req.body
    if (!content || !chatId) {
        console.log("Invalid data passed into request")
        return res.sendStatus(400)
    }
    let newMessage = {
        sender: req.hotel._id,
        content: content,
        chat: chatId,
        senderType: type
    }
    try {
        let message = await Message.create(newMessage)
        message = await message.populate("sender", "restaurantName restaurantImages ")
        message = await message.populate("chat")
        message = await Hotel.populate(message, {
            path: "chat.restaurants",
            select: "restaurantName restaurantImages"
        },
        )
        message = await User.populate(message, {
            path: "chat.users",
            select: "name profileImageName"
        },
        )

        await ChatRoom.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })
        res.status(200).json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export {
    accessChat,
    fetchChats,
    sendMessage,
    setChatUnRead,
    readMessagesUpdate,
    markAsReadUpdate,
    allMessages,
    //restaurants
    fetchChatss,
    accessChats,
    sendMessages,
    setChatUnReads,
    readMessagesUpdates,
    markAsReadUpdates
}