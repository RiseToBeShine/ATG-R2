import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngall.com%2Favatar-png%2F&psig=AOvVaw2YcXbUCFn8POotKKmuVffM&ust=1695556541743000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCICGg73WwIEDFQAAAAAdAAAAABAR'
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts :{
        type: [String]
    },
    savedPost: {
        type: [String]
    },
    followers: {
        type:[String],
    },
    following: {
        type:[String],
    },
    
    reportedBy: {
        type: [String],
    }
},
{
    timestamps:true
})

export default mongoose.model('user', UserSchema)