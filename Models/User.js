const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        requird : true,
        unique: true,
    }
})

const User = mongoose.model('user',userSchema);
module.exports = User;

 