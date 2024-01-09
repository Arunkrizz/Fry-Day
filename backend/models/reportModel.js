import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reportedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    
    timestamp: {
        type: Date,
        default: Date.now,
    },
    // status: {
    //     type: String,
    //     default: 'pending', // Other statuses may include "reviewed," "resolved," etc.
    // },
    isReviewed: {
        type: Boolean,
        default: false,
    },
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
