const connectToMongo = require('./Fuegodb');
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express();
const port = 4512;

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/authUser',require('./Routes/AuthUser'));
app.use('/api/comment',require('./Routes/routeComment'));

app.listen(port,()=>{
    console.log(`Plant is listening at port http://localhost:${port}`);
})