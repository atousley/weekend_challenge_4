var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var new_task = require('./routes/new_task');
var get_all = require('./routes/get_all');
var complete = require('./routes/complete');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/new_task', new_task);
app.use('/get_all', get_all);
app.use('/complete', complete);


app.get('/*', function  (req, res) {
    var file = req.params[0] || '/views/index.html';
    res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});