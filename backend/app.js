var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var guardianRouter = require('./routes/guardian')
var nytimesRouter = require('./routes/nyTimes')
var searchRouter = require('./routes/searchRoute')

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/news/guardian', guardianRouter)
app.use('/news/nyTimes', nytimesRouter)
app.use('/search', searchRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 8080;
// const PORT = 3000;
app.listen(PORT, process.env.IP,() => {
  console.log(`Server listening on port ${PORT}...`);
  console.log("version 0.0.1")
});


module.exports = app;
