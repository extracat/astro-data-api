require('dotenv').config({ path: '.env.local' });
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET; 

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

  // Some checks before authorization

  return done(null, jwt_payload);
}));

module.exports = passport;
