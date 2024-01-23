import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './Routes/Auth.js'
import userRoutes from './Routes/User.js'
import postRoutes from './Routes/Posts.js'
import commentRoutes from './Routes/Comment.js'


const app = express()

dotenv.config()
app.use(cors({
    origin: 'https://atg-r2-client.vercel.app',
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true
}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://atg-r2-client.vercel.app")
  next();
});

const PORT = process.env.PORT || 8800

mongoose.set('strictQuery',true)
const connect = ()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Connected to Database")
    }).catch((err)=>{
        throw err
    })
}
app.get("/",(req,res)=>{
    res.json("Hello")
})
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/post',postRoutes)
app.use('/api/comment',commentRoutes)

app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Unknown Error Occured"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})


app.listen(PORT,()=>{
    connect()
    console.log("Connected to server")
})
