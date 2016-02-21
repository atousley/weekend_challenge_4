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
        id: parseInt(req.body.id)
    };

    pg.connect(connectionString, function (err, client, done) {
        client.query("DELETE FROM tasks WHERE id = " + deleteTask.id,
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