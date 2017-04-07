var port = process.env.PORT || 4500;
var express = require("express");
var app = express();
var company = [];
app.use(express.static("Public"));
app.set("view engine", "ejs");
app.set("views", "./Views");


var mysql = require("mysql");
var conn = mysql.createConnection({
    host: '10.223.71.136',
    user: 's418985',
    password: 'abc123',
    database: 'D418985'
});

conn.connect();
conn.query('SELECT * from Company', function(err, rows, fields) {
    if (!err) {
        company = rows;
        console.log('The solution is: ', company[0].Name +" "+  company[0].Description );
    } else
        console.log('Error while performing Query.');
});

var prodLst = [];
conn.query('SELECT Name from CompanyProducts', function(err, rows, fields) {
    if (!err) {
        prodLst = rows;
        console.log('The solution is: ', prodLst);
    } else
        console.log('Error while performing Query.');
});

conn.end();

app.get('/', function(req, res) {
    res.render("index", { "name": "cts", "description": "desc", "products": prodLst });
});

app.listen(port, function(err) {
    console.log("port listening :" + port)
});

module.exports.getApp = app;