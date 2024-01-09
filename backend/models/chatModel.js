import mongoose from 'mongoose';

const chatSchema = mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },

        ],

        //update

        restaurants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Restaurant'
            }
        ],

        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatMessage"
        },
        read: {
            users: {
                read: {
                    type: Boolean,
                    default: false,
                },
                count: {
                    type: Number,
                    default: 0,
                },
            },
            restaurants: {
                read: {
                    type: Boolean,
                    default: false,
                },

                count: {
                    type: Number,
                    default: 0,
                },
            },
        },

    },
    {
        timestamps: true  // Add this line to enable automatic timestamps
    },

);
const ChatRoom = mongoose.model('ChatRoom', chatSchema);

export default ChatRoom;


