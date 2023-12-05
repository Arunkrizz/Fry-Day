import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
   
    images: [String],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    stores: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
    },
    dateListed: {
        type: Date,
        default: Date.now,
    },
    
});

const Post = mongoose.model('Post', PostSchema);

export default Post;
