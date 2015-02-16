var express = require('express'),
    app = express(),
    port = 8666,
    env = require('./env'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    githubStrategy = require('passport-github').Strategy,
    session = require('express-session'),
    githubApi = require('github'),
    cors = require('cors');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: '∆7nsa4325ds94f3∆s2345as;∆d235fsjdf∆'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

passport.use(new githubStrategy({
  clientID: env.GITHUB.CLIENT_ID,
  clientSecret: env.GITHUB.CLIENT_SECRET,
  callbackURL: 'http://localhost:8666/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
      done(null, profile);
}))

var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  } else {
      next();
  }
}

var github = new githubApi({
  version: "3.0.0"
})

passport.serializeUser(function(user, done) {
	done(null, user);
})

passport.deserializeUser(function(obj, done) {
	done(null, obj);
})

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), function(req, res) {
  res.redirect('/#/home');
}),
app.get('/api/github/following', isAuthed, function(req, res) {
  github.user.getFollowingFromUser({
    user: req.user.username
  }, function(err, response) {
    res.json(response);
  })
})

// app.get('/auth/github/callback', passport.authenticate('github', {
//   successRedirect: '/#/home',
//   failureRedirect: '/failure'
// }))

// app.get('/api/github/following', isAuthed, function(req, res) {
//     github.user.getFollowingFromUser({
//     	user: req.user.username
//     }, function(err, response) {
//     	console.log(response);
//     	res.json(response);
//     })
// })

app.get('/api/github/:username/activity', isAuthed, function(req, res) {
  github.events.getFromUser({
    user: req.params.username
  }, function(err, response) {
      res.json(response)
  })
})

app.listen(port, function() {
	console.log('now listening on port ' + port);
})