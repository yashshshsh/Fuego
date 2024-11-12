var jwt = require('jsonwebtoken');
const JWT_Secret = `I know i am a genius!!!`

const FetchUser = (req,res,next) =>{
    const token = req.header('authToken');
    if(!token){
        res.status(400).send({error:'Token is not available'})
    }
    try{
        const decoded = jwt.verify(token,JWT_Secret);
        req.user = decoded.user;
        next();
    } catch(error){
        console.log({error:'Please send a valid token'})
    }
}

module.exports = FetchUser;