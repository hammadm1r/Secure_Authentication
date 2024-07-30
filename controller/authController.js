const user = require("../model/user")
const {jwtAuthMiddleware,generateToken} = require("../middleware/jwtAuthMiddleware");

const login = async(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const id = await user.findOne({username});
    if(!id){
        return res.status(404).json("No User with this name");
    }
    const isMatch = await id.comparePassword(password)
    if(!isMatch){
        return res.status(400).json("Wrong Password");
    }
    const token = generateToken(id.username);
    console.log("Token is :",token);
    return res.status(200).json("Hello World")
}

const signup = async(req,res) =>{
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const jobType = req.body.jobType;
        if(!username||!email||!password||!jobType){
            return res.status(400).json("Fill all the fields");
        }
        const existedUser = await user.findOne({email});
        if(existedUser){
            return res.status(400).json("User already existed With This Email");
        }
        const newUser = new user();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.jobType= jobType;
        const response = await newUser.save();
        const token = generateToken(response.username);
        console.log("Token is :",token);
        res.status(200).json("Signup Successfull");
}
module.exports = {login,signup};