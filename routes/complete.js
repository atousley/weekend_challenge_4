var express = require('express');
var router = express.Router();
var pg = require('pg');


var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/weekend_4_challenge';
}
