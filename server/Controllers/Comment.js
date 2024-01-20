import Comments from "../Models/Comments.js"
import User from "../Models/User.js"
import Posts from "../Models/Posts.js"

import genError from '../error.js'

export const createComment = async(req,res,next) => {
    const newComment = new Comments({
        userId : req.user.id,
        postId : req.params.id,
        ...req.body
    })

    try {
        const savedComment = await newComment.save()
        try {
            await Posts.findByIdAndUpdate(req.params.id,{
                $push: { commentedBy: savedComment._id }
            })
        } catch (error) {
            next(genError(404,"Post Not Found..."))
        }
        res.status(200).json(savedComment)
    } catch (error) {
        next(error)
    }

}

export const deleteComment = async(req,res,next) => {
    try {
        await Comments.findByIdAndDelete(req.params.id);
        res.send(200).json("Comment Deleted Successfully")
    } catch (error) {
        next(error)
    }
}