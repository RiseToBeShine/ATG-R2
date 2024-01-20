import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    userId: {
        type: String
    },
    username: {
        type: String
    },
    imgUrl: {
        type: String
    },
    caption: {
        type: String
    },
    commentedBy: {                      // ** COMMENTS IDs */
        type: [String],
    },
    likedBy: {
        type: [String],
    }
},
{
    timestamps:true
})

export default mongoose.model('post', PostSchema)