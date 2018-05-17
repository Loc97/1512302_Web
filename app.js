var express = require('express');
var app = express();
var models = require('./models');
var expressHbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
	helpers			: {
		paginate: paginateHelper.createPagination
	}
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
	res.redirect('/articles');
})

var articles = require('./routes/articles');
app.use('/articles', articles);

var comments = require('./routes/comments');
app.use('/comments', comments);

// Setting for app here
app.use(express.static(__dirname + '/public'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Define your routes here

app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
		res.send('Database sync completed!');
	});
});


// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server is listening at port ' + app.get('port'));
});