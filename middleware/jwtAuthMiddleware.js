const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtAuthMiddleware = (req,res,next) =>{
    if (
        !req.headers ||
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
      ) {
         // return res.status(401).send('Authorization Header is Required');
          return res.send(error(401,'Authorization Header is Required'));
      }
      const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({error:'Unauthorized'});
    }
    try{
        const decoded = jwt.verify(token,process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({error:'Invalid token'});
    }
}

const generateToken = (user) =>{

    return jwt.sign(user,process.env.PRIVATE_KEY);
}

module.exports = {jwtAuthMiddleware,generateToken};