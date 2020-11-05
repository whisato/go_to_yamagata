var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var mysql = require('mysql');
var ejs = require('ejs')
var bodyParser = require('body-parser')
var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// DB setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'Goto'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
	const sql = "select * from questionnaire"
	connection.query(sql, function (err, result, fields) {
	if (err) throw err;
	console.log(result)
	});
});

app.post('/', (req, res) => {
	const sql = "INSERT INTO questionnaire SET ?"
	connection.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.render("presents.ejs");
	});
});

// rooting page
app.get('/', function(req, res, next) {
  res.render("./index.ejs");
});
app.get('/quiz', function(req, res, next) {
  res.render("quiz.ejs");
});
app.get('/presents', function(req, res, next) {
  res.render("presents.ejs");
});
app.get('/profile', function(req, res, next) {
  res.render("profile.ejs");
});
app.get('/questionnaire', function(req, res, next) {
  res.render("questionnaire.ejs");
});
app.get('/answer', (req, res) => {
	const sql = "select * from questionnaire";
	connection.query(sql, function (err, result, fields) {
	if (err) throw err;
	res.render("answer",{values : result});
	});
});
app.get('/form', function(req, res, next) {
  res.render("form.ejs");
});

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

app.listen(process.env.PORT || 8000)

module.exports = app;
