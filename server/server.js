require('dotenv').config()
const express = require('express');
const api = require('./api');
const login = require('./login');
const mailer = require('./mailer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const passwordless = require('passwordless');
const MongoStore = require('passwordless-mongostore');
const email = require('emailjs');

let server = express();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `http://${process.env.HOST}/login/facebook/callback`
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

server.use(cookieParser());
// server.use(cookieSession({keys: 'keyboard cat'}));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

var MemoryStore = session.MemoryStore;

server.use(session({ secret: 'keyboardcatttt', resave: false, store: new MemoryStore(), saveUninitialized: false}));

server.use(passport.initialize());
server.use(passport.session());

const smtpServer  = email.server.connect({
   user:    process.env.MAIL_USER,
   password: process.env.MAIL_PWD,
   host:    'smtp.mail.yahoo.com',
   ssl:     true
});

const pathToMongoDb = process.env.MONGODBSTORE_URI || 'mongodb://localhost/passwordless';
passwordless.init(new MongoStore(pathToMongoDb));

passwordless.addDelivery(
    function(tokenToSend, uidToSend, recipient, callback) {
        recipient = `${recipient}@ntu.edu.tw`;
        console.log(recipient);
        var host = process.env.HOST;
        smtpServer.send({
            text:    'Hello!\nAccess your account here: http://' 
            + host + '?token=' + tokenToSend + '&uid=' 
            + encodeURIComponent(uidToSend), 
            from:    process.env.MAIL_USER, 
            to:      recipient,
            subject: 'Token for ' + host
        }, function(err, message) { 
            if(err) {
                console.log(err);
            }
            callback(err);
        });
});
server.use(passwordless.sessionSupport()); 
server.use(passwordless.acceptToken({ successRedirect: '/'}));
 
server.use(express.static(`${__dirname}/../build`));
// server.get('/', (req, res) => {res.render('../build/index.html')});

server.use('/api', api);
server.use('/login', login);
server.use('/mail', mailer);

const port = process.env.PORT || 3000;
server.listen(port, () => {console.log(`server is running on ${port}`)});
 