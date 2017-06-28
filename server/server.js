const express = require('express');
const api = require('./api');
const login = require('./login');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = 810183655805652;
const FACEBOOK_APP_SECRET = '5b1dfd7777e8c6e2d21f37800d5bb3bb';

let server = express();

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/login/facebook/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// server.use(bodyParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.keys = ['EMISSARY'];
server.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

server.use(passport.initialize());
server.use(passport.session());

server.use(express.static('build'));
// server.get('/', (req, res) => {res.render('../build/index.html')});

server.use('/api', api);
server.use('/login', login);

const port = process.env.PORT || 3000;
server.listen(port, () => {console.log(`server is running on ${port}`)});
