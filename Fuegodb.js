const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/Plant";

const connectToMongo = () =>{
    mongoose.connect(mongoURI);
    console.log("Plant is successfully connected to the mongo");
}

module.exports = connectToMongo;