import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    postId : {
        type: String,
    },
    userId: {
        type: String,
    },
    body: {
        type: String,
    }
},
{
    timestamp: true
})

export default mongoose.model('comment', CommentSchema)