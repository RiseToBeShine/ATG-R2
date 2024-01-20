import express from 'express'
import {createComment, deleteComment} from '../Controllers/Comment.js'
import getToken from '../getToken.js'

const router = express.Router()

router.post("/:id",getToken,createComment)

router.delete("/:id",getToken,deleteComment)

export default router;