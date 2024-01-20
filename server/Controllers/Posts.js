import Posts from "../Models/Posts.js";
import User from "../Models/User.js"
import Comment from "../Models/Comments.js"

export const createPost = async(req,res,next) => {
    const newPost = new Posts({
        userId : req.user.id,
        ...req.body
    })
    try {
        const savedPost = await newPost.save()
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.posts.push(savedPost._id);
        await user.save();
        res.status(200).json(savedPost)
    } catch (error) {
        next(error)
    }
}

export const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id; 
        const updateData = req.body;

        const existingPost = await Posts.findById(postId);

        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if(req.user.id != existingPost.userId) {
            return res.status(401).json({message: 'Not allowed to Update'})
        }

        const updatedPost = await Posts.findByIdAndUpdate(
            postId,
            { $set: updateData },
            { new: true } 
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        next(error);
    }
};

export const deletePost = async(req,res,next) => {
    try {
        const post = await Posts.findById(req.params.id)
        if(post.userId === req.user.id) {
            await Posts.findByIdAndDelete(req.params.id)
            res.status(200).json("Video Deleted Successfully")
        } else {
            res.status(403).json("You can only delete your own video")
        }
    } catch (error) {
        next(error)
    }
}

export const randomPost = async (req,res,next) => {
    try {
        const posts = await Posts.aggregate([{$sample: {size: 40}}])
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

export const showComment = async (req, res, next) => {
    try {
        const posts = await Posts.findById(req.params.id);
        const commentIds = posts.commentedBy;
        let allComments = [];

        for (const commentId of commentIds) { // Use for...of instead of for...in
            const com = await Comment.findById(commentId);
            const use = await User.findById(com.userId)
            const obj = {
                body: com.body,
                username: use.name,
                image: use.avatarUrl
            }
            if (obj) {
                allComments.push(obj);
            }
        }

        const ans = {
            comments: allComments,
            post: posts
        }

        res.status(200).json(ans)
    } catch (error) {
        next(error);
    }
};
