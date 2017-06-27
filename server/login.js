const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const router = express.Router();

const FACEBOOK_APP_ID = 810183655805652;
const FACEBOOK_APP_SECRET = '5b1dfd7777e8c6e2d21f37800d5bb3bb';

router.use(express.static('public'));

router.use(cookieParser());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(session({ secret: 'keyboard cat' }));
router.use(passport.initialize());
router.use(passport.session());
// router.use(router.router);

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/login/facebook/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }
));

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

module.exports = router;
