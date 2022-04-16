
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const compression = require('compression');
const helmet = require('helmet');
const salt = require('./utils/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userModel = require('./models/user');
var app = express();

var url = process.env.MONGOURL;
mongoose.connect(url, (err)=>{
  if(err){throw err}
  var status = mongoose.connection;
  status.on('error', console.error.bind(console, 'Mongoose connection error'));
});


passport.use(new Strategy((username, password, done) => {
    userModel.findOne({ email: username }, (err, user) => {
      if (err) { return done(err); };
      if (!user) { return done(null, false, {message: 'Invalid credentials provided'}); };
      if (user.password !== salt.hashPassword(password)) { return done(null, false); }

      return done(null, user);
    });
  }));

passport.serializeUser((user, done)=>{
  done(null, user._id);
});

passport.deserializeUser((id, done)=>{
    userModel.findById(id, function(err, user){
      done(err, user);
    })
});

app.use(compression());
app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secr3t',
  resave: false,
  saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next)=>{
  res.locals.loggedIn = req.isAuthenticated();
  next();
});



app.use('/', indexRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = 3000 || process.env.PORT
app.listen(4000, (err)=>{
  if(err) throw err;
  console.log(`Listening on port ${port}`)
})

module.exports = app;
