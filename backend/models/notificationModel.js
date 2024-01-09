import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    refPath: 'senderType', // Use dynamic reference based on senderType
      required: true,
    },
    senderType: {
        type: String,
        enum: ['User', 'Restaurant'],
        required: true,
      },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    refPath: 'receiverType', // Use dynamic reference based on receiverType
      required: true,
    },
    receiverType: {
        type: String,
        enum: ['User', 'Restaurant'],
        required: true,
      },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom'
    },
    content: {
      type: String,
      required: true,
    },
    // link: {
    //   type: String, // You can use this to provide a link to the relevant page
    // },
    // read: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;