var express = require('express');
var router = express.Router();
var pg = require('pg');


var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/weekend_4_challenge';
}

router.post('/', function(req, res) {
    var deleteTask = {
        task: parseInt(req.body.task)
    };

    pg.connect(connectionString, function (err, client, done) {
        client.query("DELETE FROM tasks WHERE id = " + deleteTask.task,
            function (err, result) {
                done();

                if (err) {
                    console.log("Error with data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
    });
});

module.exports = router;

//router.get('/', function(req, res) {
//    var results = [];
//    pg.connect(connectionString, function(err, client, done) {
//        var query = client.query('SELECT * FROM tasks WHERE completed = true;');
//
//        query.on('row', function(row) {
//            results.push(row);
//        });
//
//        query.on('end', function() {
//            client.end();
//            return res.json(results);
//        });
//
//        if(err) {
//            console.log(err);
//        }
//    });
//});
