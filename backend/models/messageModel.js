import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // ref: 'User'
    refPath: 'senderType', // Use dynamic reference based on senderType
  },
  senderType: {
    type: String,
    enum: ['User', 'Restaurant'],
    required: true,
  },
  content: {
    type: String,
    trim:true
  }
},
  {
    timestamps: true
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

export default ChatMessage;