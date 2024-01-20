import express from 'express'
import {del, get, save, like, unlike} from '../Controllers/User.js'
import getToken from '../getToken.js'

const router = express.Router()

router.delete('/:id',getToken,del)

router.get('/find/:id',get)

router.put('/save/:id', getToken, save)                     //SAVE A POST

router.put('/like/:id',getToken,like)

router.put('/unlike/:id',getToken,unlike)

export default router