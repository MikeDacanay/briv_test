const passport = require("passport");
const passportJWT = require("passport-jwt");
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});

const JWTStrategy = passportJWT.Strategy;


const passportJWTStrategy = (req, res, next) => {
  passport.use(new JWTStrategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: `${process.env.JWT_KEY}`,
    }, ({_id, display_name}, done) => {
      if(_id && display_name) return done(null, {_id, display_name});
      //TODO This needs to be transfered over as message
      return done(null, false, {
        message: "Invalid token or something"
      })
  }))  
}

module.exports = passportJWTStrategy;