import express from 'express'
import {createPost, deletePost, randomPost, showComment, updatePost} from '../Controllers/Posts.js'
import getToken from '../getToken.js'

const router = express.Router()

// ** Create a POST
router.post("/",getToken,createPost)

//** Update a POST */
router.put('/:id', getToken ,updatePost)

//** Delete a POST */
router.delete("/:id",getToken,deletePost)

//** Random POST */
router.get("/rand",randomPost)

//** Show Comment */
router.get("/comments/:id",getToken,showComment)

export default router