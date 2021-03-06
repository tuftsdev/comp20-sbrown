//Connect to database

// Express initialization
var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());
app.set('title', 'nodeapp');
app.set('views', __dirname + '/views');
//app.use(express.static('../public/'));
app.engine('.html', require('ejs').renderFile);


// Mongo initialization
var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL ||  
  'mongodb://admin:12345@dharma.mongohq.com:10010/Trippy';
var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
db = databaseConnection;
}); 


var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '../../public'));


app.all('/', function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.all('/submit2.json', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(request,response, next) {
  response.render('login.html'); 
});


app.get('/login.html', function(request,response, next) {
  response.render('login.html'); 
});

app.get('/index.html', function(request,response, next) {
  response.render('index.html'); 
});

app.get('/signup.html', function(request,response, next) {
  response.render('signup.html'); 
});

app.all('/database', function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
app.get('/database', function(request, response, next) {
//req.query.game_title
//        var gametitle = request.query.game_title;
var newentry = [{"Trip": "Southern Asia", "username": "Kenny", "loca": "Bangkok"}];
db.collection('TripInfo', function(err, collection){
//        TripInfo.insert(newentry);
		if(!err){
                  collection.find().toArray(function(err, TripInfo){
		var Array2 = new Array();
                var i = 0;
                while (TripInfo[i]!= null){
                        Array2[i]= TripInfo[i];
                        i++;}
                        response.send(Array2);
				});
			};
     });
});

app.all('/database2', function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
app.get('/database2', function(request, response, next) {
//req.query.game_title
//        var gametitle = request.query.game_title;
db.collection('Validator', function(err, collection){
//        TripInfo.insert(newentry);
		if(!err){
                  collection.find().toArray(function(err, Validator){
		var Array2 = new Array();
                var i = 0;
                while (Validator[i]!= null){
                        Array2[i]= Validator[i];
                        i++;}
                        response.send(Array2);
				});
			};
     });
});


app.post('/submit2.json', function (request, response, next) {
var trip = request.body.trip;
var loca = request.body.loca;
var username = request.body.username;
var text_field = request.body.text_field;

var newentry = [{"trip": trip, "username": username, "loca":loca, "text_field": text_field}];
db.collection('TripInfo', function(er, TripInfo) {
	if(!er){
	TripInfo.insert(newentry);
	}
	});
response.send(newentry);
});

app.all('/submit.json', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
 
app.post('/submit.json', function(request, response, next) {
	var name = request.body.name;
	var username = request.body.username;
	var password = request.body.password;
	var post = [{"name":name, "username":username, "password":password}];
	console.log(db);
	db.collection('Validator', function(er,users){
		if(!er){
			users.insert(post);
		}
	});
	response.send(post);
});

app.listen(process.env.PORT || 5000);


