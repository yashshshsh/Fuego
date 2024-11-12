const mongoose = require('mongoose');
const {Schema} = mongoose;
const commmentSchema = new Schema({
    plant:{
        type:String,
        required:true,
    },
    commentP:{
        type:String,
        required:true,
        unique: true,
    },
})

const Comment = mongoose.model('comment',commmentSchema);
module.exports = Comment;

 