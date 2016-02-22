var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var new_task = require('./routes/new_task');
var get_all = require('./routes/get_all');
var complete = require('./routes/complete');
var deleteTask = require('./routes/delete');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/new_task', new_task);
app.use('/get_all', get_all);
app.use('/complete', complete);
app.use('/delete', deleteTask);

app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/scripts'));
app.use(express.static('public/styles'));
app.use(express.static('public/vendors'));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});