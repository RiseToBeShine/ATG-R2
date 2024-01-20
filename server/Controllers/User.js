import User from "../Models/User.js"
import genError from "../error.js"
import Post from "../Models/Posts.js"

export const del = async (req,res,next)=>{
    if(req.params.id === req.user.id){
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id)
            res.status(200).json(deletedUser)
        } catch (error) {
            next(genError(error))
        }
    } else {
        next(genError(403,"User can Delete only its own account"))
    }
}

export const get = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        if(user){
            res.status(200).json(user)
        }else {
            next(genError(404,"User not found"))
        }
    } catch (error) {
        next(genError(error))
    }
}

export const save = async(req,res,next)=> {
    try {
        const postId = req.params.id
        const userId = req.user.id
        await User.findByIdAndUpdate(userId,{
            $push : {savedPost : postId}
        })
    } catch (error) {
        next(genError(error))
    }
}

export const like = async(req,res,next) => {
    const id = req.user.id
    const postId = req.params.id
    try {
        const post = await Post.findByIdAndUpdate(postId,{
            $push: {likedBy: id},
        })
        if(!post){
            res.status(404).json("Post Not Found");
        }else{
            res.status(200).json("Like Added");
        }
    } catch (error) {
        next(error)
    }
}

export const unlike = async(req,res,next) => {
    const id = req.user.id
    const postId = req.params.id
    try {
        const post = await Post.findByIdAndUpdate(postId,{
            $pull: {likedBy: id},
        })
        if(!post){
            res.status(404).json("Post Not Found");
        }else{
            res.status(200).json("Like Added");
        }
    } catch (error) {
        next(error)
    }
}
