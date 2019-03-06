const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/jwtsample');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    }
});
const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    byEmail:{
        type: String,
        required:true
    },
    byFirstName:{
        type:String,
        required:true
    }
});
const User = mongoose.model('User',userSchema);
const Post = mongoose.model('Post',postSchema);

const signup = (user,callback)=>{
    // synchronous method for hashing
    let hashedPassword = bcrypt.hashSync(user.password,10);
    const userObj = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        phone: user.phone,
        gender: user.gender
    });
    User.create(userObj,(err,response)=>{
        callback(err,response);
    });   
}
const findUser = (email,callback)=>{
    User.findOne({ email: email},(err,data)=>{
        callback(err,data);
    });
}
const writePost = (postInfo,callback)=>{
    const postObj = new Post({
        title: postInfo.title,
        description: postInfo.description,
        byEmail: postInfo.byEmail,
        byFirstName: postInfo.byFirstName
    });
    Post.create(postObj,(err,response)=>{
        callback(err,response);
    });
}
const getPosts = (email,callback)=>{
    Post.find({byEmail: {$ne:email}},(err,data)=>{
        callback(err,data);
    })
}
module.exports={
    signup : signup,
    findUser : findUser,
    writePost : writePost,
    getPosts : getPosts
}