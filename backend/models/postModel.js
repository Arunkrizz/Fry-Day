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
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comments: [
        {
            user:{
                _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name:{
                type: String,
                required: true
            },
            profileImageName:{
                type: String,
                default:"https://imgs.search.brave.com/mOPrmNxxMu7MHNwklLImZofhxpblYZ50lVBN9h6VhJw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL3VzZXItcG5n/LWljb24tYmlnLWlt/YWdlLXBuZy0yMjQw/LnBuZw"
                // required: true
            }
        },
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
    ],
    isRemoved: {
        type: Boolean,
        default: false,
    },
    
},
// {
//     timestamps: true,
//  }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
