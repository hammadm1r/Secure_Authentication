const passport = require('passport');
const user = require("../model/user");
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async(username,password,done)=>{
    try {
        const id = await user.findOne({username:username});
        if (!id){
            return done(null,false,{message:'Invalid username'});
        }
        const isPasswordMatch = await id.comparePassword(password);
        if(!isPasswordMatch){
            return done(null,false,{message:'Invalid password'});
        }
        return done(null,id,{message:"Passed"});
    } catch (error) {
        return done(null,false,{message:`${error}`});
    }
}))

module.exports = passport;