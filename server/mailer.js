var express = require('express');
var passwordless = require('passwordless');

var router = express.Router();

router.post('/sendtoken', 
  passwordless.requestToken(
    // Turn the email address into an user ID
    function(user, delivery, callback, req) {
        // usually you would want something like:
      //   User.find({email: user}, callback(ret) {
      //      if(ret)
      //         callback(null, ret.id);
      //      else
      //         callback(null, null);
      // })
      // but you could also do the following 
      // if you want to allow anyone:
      callback(null, user);
    }
  ),
  function(req, res) {
    // success!
    res.json('sent');
  }
);

module.exports = router;
