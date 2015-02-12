var express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    githubStrategy = require('passport-github').Strategy,
    githubApi = require('github');

var app = express();
var port = 8666;

app.use(session({
	secret: '7nds94f3∆sas;∆dfsjdf∆'
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+'/public'));

passport.serializeUser(function(user, done) {
	done(null, user);
})

passport.deserializeUser(function(obj, done) {
	done(null, obj);
})

var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}

var github = new githubApi({
	version: "3.0.0"
})

app.get('/api/github/following', isAuthed, function(req, res) {
    github.user.getFollowingFromUser({
    	user: "mPemba"
    }, function(err, response) {
    	console.log(response);
    	res.send(response);
    })
})

passport.use(new githubStrategy({
	clientID: 'e2cef79827cf628f5d3f',
	clientSecret: '0951f94f8a737b6eb0295f42ec253e92560d7d32',
	callbackURL: 'http://localhost:8666/auth/github/callback'
}))

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', {
	successRedirect: '/home',
	failureRedirect: '/failure'
}))

app.listen(port, function() {
	console.log('now listening on port ' + port);
})