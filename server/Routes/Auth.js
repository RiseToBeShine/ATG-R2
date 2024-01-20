import express from "express";
import { register, login, forgotPassword, resetPassword } from "../Controllers/Auth.js";

const router = express.Router()

//Register a user
router.post('/register',register)

//Login a user
router.post('/login', login)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:id/:token', resetPassword)

export default router