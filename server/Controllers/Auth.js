import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../Models/User.js'
import genErr from '../error.js'
import nodemailer from 'nodemailer'


export const register = async (req,res,next) => {
    console.log(req.body)
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password,salt)
        const newUser = new User({...req.body, password: hashPassword})

        await newUser.save()
        res.status(200).send("User Created successfully")
    } catch (error) {
        next(error)
    }
}

export const login = async (req,res,next) => {
    try {
        const user = await User.findOne({email:req.body.email})
        
        if(!user) next(genErr(404,"User Not Found"))
        if(!bcrypt.compareSync(req.body.password,user.password)) next(genErr(401,"Invalid Password"))

        const token = jwt.sign({id:user._id}, process.env.JWT)

        const {password,...withoutPassword} = user._doc
        
        res.cookie("access_token",token,{
            httpOnly: true,
            maxAge: 86400000
        })
        res.status(200).json(withoutPassword)
        
    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (req,res,next)=>{
    const {email} = req.body;
    console.log('here')
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mradul18intern@gmail.com',
              pass: 'mpxwlongzoqogtbh'
            }
          });
          
          var mailOptions = {
            from: 'mradul18intern@gmail.com',
            to: email,
            subject: 'Reset Password Link',
            text: `http://localhost:5173/reset_password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.send({Status: "Failed"})
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
}

export const resetPassword = async (req,res,next) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {
                User.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
}