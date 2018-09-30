const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();

mongoose.connect('mongodb://localhost/test', function(err, res){
	if(err) console.log('fail connection to BD: ' + err);
	else console.log('Connection to BD successful');
});


app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(validator());


app.engine('.hbs', hbs({
	defaultlayout: 'default',
	extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.get('/', function(req, res){
	res.render('default');
});

require('./repositories/productRepository')(app);

app.listen(8080);
console.log('Server of Test Listening port 8080');
