const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});

const JWTStrategy = passportJWT.Strategy;


const passportJWTStrategy = passport.use(new JWTStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY,
  }, (jwt_payload, done) => {
    // if(user.id === jwt_payload.user._id){
    //   return done(null, user)
    // } else {
    //   return done(null, false, {
    //     message: "Token not matched"
    //   })
    // }

    console.log(jwt_payload);

    return done(null, null);
}))  

module.exports = passportJWTStrategy;